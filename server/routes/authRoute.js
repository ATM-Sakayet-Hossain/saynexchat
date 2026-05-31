const express = require("express");
const {
  signUp,
  signIn,
  getUserProfile,
} = require("../controllers/authController");
const authMiddleWare = require("../middleware/authMiddleware");
const route = express.Router();
route.post("/signup", signUp);
route.post("/signin", signIn);
route.get("/profile", authMiddleWare, getUserProfile);
module.exports = route;