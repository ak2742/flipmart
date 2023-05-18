const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
const prodModel = require("../models/product")
const cartModel = require("../models/cart")
const middleware = require("../middleware/auth")
const { f1 } = require('../middleware/image')
const secret = process.env.JWT_SECRET

router.post("/join",
    body("name", "Enter a valid name").isLength({ min: 1, max: 50 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Use a strong password").isLength({ min: 8, max: 25 }),
    body("isBuyer").isBoolean(), body("isSeller").isBoolean(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            const existingUser = await userModel.findOne({ email: req.body.email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ error: "A user with this email already exists" });
            }
            if (req.body.isBuyer === "true" || req.body.isSeller === "true") {
                const salt = await bcrypt.genSalt(14)
                const hashedPwd = await bcrypt.hash(req.body.password, salt);
                const createdUser = await userModel.create({
                    image: f1(req.body.image, req.body.name),
                    name: req.body.name,
                    password: hashedPwd,
                    email: req.body.email,
                    isBuyer: req.body.isBuyer,
                    isSeller: req.body.isSeller
                });
                const tokenElement = {
                    user: {
                        id: createdUser.id,
                    }
                }
                const token = jwt.sign(tokenElement, secret, { expiresIn: "365d" });
                return res.json({ token })
            }
            res.status(400).send({ error: "you must choose atleast one role for you" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "INTERNAL SERVER ERROR" })
        }
    }
)

router.post("/login",
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Use a strong password").isLength({ min: 8, max: 25 }),
    async (req, res) => {
        try {
            let success = false
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            const { email, password } = req.body
            const existingUser = await userModel.findOne({ email });
            if (!existingUser) {
                success = false;
                return res
                    .status(400)
                    .json({ success, error: "incorrect credentials" });
            }
            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!passwordMatch) {
                success = false;
                return res
                    .status(400)
                    .json({ success, error: "incorrect credentials" });
            }
            const tokenElement = {
                user: {
                    id: existingUser.id,
                }
            }
            const token = jwt.sign(tokenElement, secret, { expiresIn: "365d" });
            success = true
            res.json({ success, token })

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "INTERNAL SERVER ERROR" })
        }
    }
)

router.post("/account", middleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId).select("-password");
        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.get("/find/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await userModel.findById(userId).select("-password -email -balance");
        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.post("/account/edit", middleware, async (req, res) => {
    try {
        const reqUser = await userModel.findById(req.user.id)
        const { image, name, description } = req.body
        let newUser = {}
        if (image) {
            newUser.image = f1(image, reqUser.name)
        }
        if (name) {
            newUser.name = name
        }
        if (description) {
            newUser.description = description
        }
        await userModel.findByIdAndUpdate(
            req.user.id,
            { $set: newUser },
            { new: true }
        );
        const userData = await userModel.findById(req.user.id).select("-password");
        return res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.delete("/account/delete",
    body("password").isLength({ min: 8, max: 25 }),
    middleware, async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }
            const existingUser = await userModel.findById(req.user.id);
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                existingUser.password
            );
            if (!passwordMatch) {
                return res
                    .status(400)
                    .json({ error: "incorrect password" });
            }
            const deletedUser = await userModel.findByIdAndDelete(req.user.id).select("-password");
            const deletedProducts = await prodModel.deleteMany({ user: req.user.id });
            await cartModel.deleteMany({ user: req.user.id });
            res.json({ Success: "Account and related stuff has been deleted", Account: deletedUser, Products: deletedProducts });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "INTERNAL SERVER ERROR" })
        }
    }
)

module.exports = router