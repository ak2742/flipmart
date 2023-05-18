const express = require("express")
const router = express.Router()
const fs = require('fs')
const prodModel = require("../models/product")
const userModel = require("../models/user")
const cartModel = require("../models/cart")
const imgModel = require("../models/image")
const orderModel = require("../models/order")

const fn_add = async (paramID) => {
    try {
        const createdImg = new imgModel({
            title: paramID,
            data: fs.readFileSync(`./images/${paramID}.png`, { encoding: 'base64' })
        });
        const savedImg = await createdImg.save();
        const img_obj = await imgModel.findById(savedImg._id)
        return img_obj.title
    } catch (err) {
        console.log(err)
        return "error"
    }
}

const fn_get = (img_obj) => {
    try {
        fs.writeFileSync(`./images/${img_obj.title}.png`, img_obj.data, { encoding: 'base64' })
    } catch (err) {
        console.log(err)
    }
}

router.get('/images/add/:id', async (req, res) => {
    try {
        if (req.params.id === "all") {
            fs.readdir('./images', (err, files) => {
                files.forEach(file => {
                    fn_add(file.split('.png')[0])
                });
            })
            return res.json("Done")
        } else {
            return res.json(fn_add(req.params.id))
        }
    } catch (error) {
        console.log('-1')
    }
}
)

router.get('/images/get/:id', async (req, res) => {
    try {
        if (req.params.id === "all") {
            const img_obj_arr = await imgModel.find()
            img_obj_arr.forEach(img_obj => {
                fn_get(img_obj)
            });
            return res.json("Done")
        } else {
            const img_obj = await imgModel.findById(req.params.id)
            fn_get(img_obj)
            return res.json(`/images/${req.params.id}.png`);
        }
    } catch (error) {
        console.log('-1')
    }
}
)

router.get('/', async (req, res) => {
    try {
        let all = []
        users = await userModel.find()
        all.push(users)
        prods = await prodModel.find()
        all.push(prods)
        carts = await cartModel.find()
        all.push(carts)
        orders = await orderModel.find()
        all.push(orders)
        imgs = await imgModel.find()
        all.push(imgs)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)

router.get('/delete/:id', async (req, res) => {
    try {
        let all = []
        users = await userModel.findByIdAndRemove(req.params.id)
        all.push(users)
        prods = await prodModel.findByIdAndRemove(req.params.id)
        all.push(prods)
        carts = await cartModel.findByIdAndRemove(req.params.id)
        all.push(carts)
        orders = await orderModel.findByIdAndRemove(req.params.id)
        all.push(orders)
        imgs = await imgModel.findByIdAndRemove(req.params.id)
        all.push(imgs)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)
router.get('/u', async (req, res) => {
    try {
        let all = []
        users = await userModel.find()
        all.push(users)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)
router.get('/p', async (req, res) => {
    try {
        let all = []
        prods = await prodModel.find()
        all.push(prods)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)
router.get('/c', async (req, res) => {
    try {
        let all = []
        carts = await cartModel.find()
        all.push(carts)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)
router.get('/o', async (req, res) => {
    try {
        let all = []
        orders = await orderModel.find()
        all.push(orders)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)
router.get('/i', async (req, res) => {
    try {
        let all = []
        imgs = await imgModel.find()
        all.push(imgs)
        res.send(all)
    } catch (error) {
        console.log('-1')
    }
}
)

module.exports = router