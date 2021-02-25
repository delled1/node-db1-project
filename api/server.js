const express = require("express");
const server = express();

const accountsRouter = require("./accounts/accounts-router")

server.use(express.json());
server.use("/api/accounts", accountsRouter)


server.get("/", (req, res) => {
    res.send("<h1>Unit 4: Node DB1 Project")
})

module.exports = server;
