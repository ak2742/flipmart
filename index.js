const express = require('express');
const cors = require('cors');
const dbconn = require('./dbconn');
const server = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.EXPRESS_PORT

dbconn();

server.use(express.json({ limit: '5mb' }));
server.use(cors());

server.use("/images", express.static('./images'))
server.use("/admin", require("./endpoints/admin"))
server.use("/user", require("./endpoints/user"))
server.use("/product", require("./endpoints/product"))
server.use("/cart", require("./endpoints/cart"))

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});