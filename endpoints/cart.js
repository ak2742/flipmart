const express = require("express")
const router = express.Router()
const middleware = require("../middleware/auth")
const prodModel = require("../models/product")
const userModel = require("../models/user")
const cartModel = require("../models/cart")

router.post("/add/:id", middleware, async (req, res) => {
    try {
        const paramId = req.params.id
        const existingItem = await prodModel.findById(paramId)
        const existingOrders = await cartModel.findOne({ user: req.user.id, product: paramId })
        const reqUser = await userModel.findById(req.user.id)
        if (!reqUser.isBuyer === "true") {
            return res.status(400).send("You are not a buyer")
        }
        if (!existingItem) {
            return res.status(404).send("Product not found")
        }
        if (existingItem.user === req.user.id) {
            return res.status(400).send("That product is being sold by you")
        }
        if (existingOrders !== null) {
            return res.status(400).send("Already in cart")
        }
        const createdOrder = new cartModel({
            user: req.user.id,
            product: paramId
        });
        const savedOrder = await createdOrder.save();
        const savedItem = await prodModel.findById(savedOrder.product)
        res.json(savedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
)

router.get("/", middleware, async (req, res) => {
    try {
        let existingItems = await cartModel.find({ user: req.user.id })
        const itemsFound = [];
        while (existingItems !== []) {
            const each = existingItems.pop()
            if (each !== undefined) {
                const item = await prodModel.findById(each.product)
                itemsFound.push(item)
            } else {
                return res.json(itemsFound);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
)

router.delete("/remove/:id", middleware, async (req, res) => {
    try {
        const existingOrder = await cartModel.findOne({ user: req.user.id, product: req.params.id });
        if (existingOrder === null) {
            return res.status(404).send("Order Not Found");
        }
        await cartModel.deleteMany({ user: req.user.id, product: req.params.id });
        res.json({ success: "removed" });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
)

module.exports = router