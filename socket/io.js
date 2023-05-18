const io = require('../index')
const userModel = require("../models/user")
const chatModel = require("../models/chat")
const lsModel = require("../models/lastSeen")

let myUsers = []

const msgUpdate = async (obj) => {
    if (obj.type === "update") {
        await chatModel.updateMany({from: obj.from, to: obj.to}, {active: "y"})
    } else {
    let status = "n"
    const getStatus = lsModel.findOne({user: obj.to})
    if (getStatus) {
        if (getStatus.date === "active") {
            status = "y"
        }
    }
    const msgNew = new chatModel({
        from: obj.from._id,
        to: obj.to,
        active: status,
        message: obj.msg,
        date: Date.now()
    });
    return await msgNew.save();
}
}


const lsUpdate = async (stat, usr) => {
    let lastActive = await lsModel.findOne({user: usr._id})
    let status = "active"
    if (stat !== "active") {
        status = Date.now()
    }
    if (!lastActive) {
        const lsNew = new lsModel({
            user: usr._id,
            date: status
        });
        return await lsNew.save();
    } else {
        await lsModel.findOneAndUpdate({user: usr._id}, {date: status})
    }
}

io.on("connection", (socket) => {
    socket.on("new-user-joined", async (id) => {
        try {
            user = await userModel.findOne({ _id: id }).select("_id name")
            if (!user) {
                socket.disconnect()
            } else {
                myUsers[socket.id] = user
                lsUpdate("active", myUsers[socket.id])
                socket.join(id)
                socket.broadcast.emit("user-joined", myUsers[socket.id]);
            }
        } catch (error) {
            socket.disconnect()
        }
    });

    socket.on("request-data", async (from) => {
        try {
            user = await userModel.findOne({ _id: from }).select("name")
            recieved = await chatModel.find({ to: myUsers[socket.id]._id, from: from })
            sent = await chatModel.find({ to: from, from: myUsers[socket.id]._id })
            all = recieved.concat(sent)
            sorted = all.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
            if (!user) {
                user = { name: "" }
            }
            if (!sorted) {
                socket.emit("recieved-data", { from: user.name, history: [] })
            } else {
                socket.emit("recieved-data", { from: user.name, history: sorted })
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("send-msg", (data) => {
        try {
            if (data.to) {
                msgUpdate({ from: myUsers[socket.id]._id, to: data.to, msg: data.message, type: "save" })
                socket.to(data.to).emit("recieve-msg", {
                    message: data.message,
                    from: myUsers[socket.id],
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("success", (data) => {
        try {
            msgUpdate({from: data, to: myUsers[socket.id]._id, type: "update"})
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect", () => {
        try {
            if (myUsers[socket.id]) {
                lsUpdate("", myUsers[socket.id])
                socket.broadcast.emit("user-left", myUsers[socket.id]);
            }
        } catch (error) {
            console.log(error)
        }
    });
});

module.exports = io