const db = require("mongoose")
const { Schema } = db

const imgModel = new Schema({
    title: {
        type: String,
        unique: true,
    },
    data: {
        type: String,
        default: "",
    },
})

module.exports = db.model("image", imgModel)