const db = require("mongoose")
const { Schema } = db

const chatModel = new Schema({
    from: {
        type: db.Schema.Types.ObjectId,
        ref: "user",
    },
    to: {
        type: db.Schema.Types.ObjectId,
        ref: "user",
    },
    message: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: "n"
    },
    date: {
        type: Date,
    }
})

module.exports = db.model("chat", chatModel)