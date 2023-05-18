const db = require("mongoose")
const { Schema } = db

const lastSeenModel = new Schema({
    user: {
        type: db.Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: String,
        default: Date.now()
    }
})

module.exports = db.model("lastSeen", lastSeenModel)