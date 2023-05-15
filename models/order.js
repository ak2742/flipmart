const db = require("mongoose")
const { Schema } = db

const orderModel = new Schema({
    user: {
        type: db.Schema.Types.ObjectId,
        ref: "user",
    },
    product: {
        type: db.Schema.Types.ObjectId,
        ref: "product",
    },
    units: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = db.model("order", orderModel)