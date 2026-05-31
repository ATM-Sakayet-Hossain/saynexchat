const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const route = express.Router();
route.use("/auth", require("./authRoute"));
route.use("/conv", authMiddleWare, require("./convRoute"));
module.exports = route;
