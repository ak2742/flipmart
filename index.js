const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const cors = require('cors');
const path = require('path');
const dbconn = require('./dbconn');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.EXPRESS_PORT

dbconn();

app.use(require('sanitize').middleware);
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cors());

module.exports = io
require('./socket/io')

app.use("/images", express.static('./images'))
app.use("/admin", require("./endpoints/admin"))
app.use("/user", require("./endpoints/user"))
app.use("/product", require("./endpoints/product"))
app.use("/cart", require("./endpoints/cart"))
app.use("/order", require("./endpoints/order"))

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
