const express = require('express');
const path = require('path');
const cors = require('cors');
const dbconn = require('./dbconn');
const server = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.EXPRESS_PORT

dbconn();

server.use(express.urlencoded({  limit: '5mb', extended: true }));
server.use(express.json({ limit: '5mb' }));
server.use(cors());

server.use("/images", express.static('./images'))
server.use("/admin", require("./endpoints/admin"))
server.use("/user", require("./endpoints/user"))
server.use("/product", require("./endpoints/product"))
server.use("/cart", require("./endpoints/cart"))
server.use("/order", require("./endpoints/order"))

server.use("/app", express.static(path.join(__dirname, 'build')))
server.get('/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});