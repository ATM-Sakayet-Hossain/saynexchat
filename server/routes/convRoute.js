const express = require("express");
const {
  addNewFriend,
  conversationList,
  sendMessage,
  getMessages,
} = require("../controllers/convController");
const route = express.Router();
route.post("/addnewfriend", addNewFriend);
route.get("/list", conversationList);
route.post("/sendmessage", sendMessage);
route.get("/getmessages/:conversation", getMessages)
module.exports = route;
