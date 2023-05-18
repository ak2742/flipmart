const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const prodModel = require("../models/product")
const userModel = require("../models/user")
const middleware = require("../middleware/auth")
const { f1 } = require('../middleware/image')

router.post("/add", middleware,
  body("title", "Please provide a title").isLength({ min: 1, max: 150 }),
  body("description", "Please provide a description").isLength({ min: 1, max: 500 }),
  body("category", "Please provide a category").isLength({ min: 1, max: 50 }),
  body("price", "Please provide a price").isLength({ min: 1, max: 10 }),
  async (req, res) => {
    try {
      const reqUser = await userModel.findById(req.user.id)
      const { image, title, description, category, price } = req.body;
      if (!reqUser.isSeller === "true") {
        return res.status(400).send("you cannot upload products as you are not a seller")
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const createdProduct = new prodModel({
        image: f1(image, reqUser.name),
        title,
        description,
        category,
        price,
        user: req.user.id,
      });
      const productSaved = await createdProduct.save();
      res.json(productSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR")
    }
  }
)

router.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (id == "all") {
      const existingItems = await prodModel.find()
      return res.json(existingItems);
    }
    const existingItem = await prodModel.find({ _id: id })
    res.json(existingItem);
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR")
  }
}
)

router.get("/by/:user", middleware, async (req, res) => {
  try {
    const user = req.params.user
    if (user === "me") {
      const existingItems = await prodModel.find({ user: req.user.id })
      return res.json(existingItems);
    }
    if (user === "oth") {
      const existingItems = await (await prodModel.find())
        .filter(item => item.user.toString() !== req.user.id)
      return res.json(existingItems);
    }
    const existingItems = await prodModel.find({ user: user })
    res.json(existingItems);
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR")
  }
}
)

router.put("/edit/:id", middleware, async (req, res) => {
  try {
    const reqUser = await userModel.findById(req.user.id)
    const { image, title, description, category, price } = req.body
    if (!reqUser.isSeller === "true") {
      return res.status(400).send("you cannot edit products as you are not a seller")
    }
    let newItem = {};
    if (image) {
      newItem.image = f1(image, reqUser.name);
    }
    if (title) {
      newItem.title = title;
    }
    if (description) {
      newItem.description = description;
    }
    if (category) {
      newItem.category = category;
    }
    if (price) {
      newItem.price = price;
    }

    const existingProduct = await prodModel.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).send("Product Not Found");
    }

    if (existingProduct.user.toString() !== req.user.id) {
      return res.status(400).send("Forbidden");
    }
    const productUpdated = await prodModel.findByIdAndUpdate(
      req.params.id,
      { $set: newItem },
      { new: true }
    )
    res.json(productUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR")
  }
}
)

router.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const reqUser = await userModel.findById(req.user.id)
    if (!reqUser.isSeller === "true") {
      return res.status(400).send("you cannot delete products as you are not a seller")
    }
    const existingProduct = await prodModel.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).send("Product Not Found");
    }

    if (existingProduct.user.toString() !== req.user.id) {
      return res.status(401).send("Forbidden");
    }
    const deletedItem = await prodModel.findByIdAndDelete(req.params.id)
    res.json({ Success: "Product has been deleted", Product: deletedItem });
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR")
  }
}
)

module.exports = router