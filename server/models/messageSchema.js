const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  contentType: {
    type: String,
    required: true,
    default: "text",
    enum: ["text", "image", "video", "voice"],
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  conversation: {
    type: mongoose.Types.ObjectId,
    ref: "convSchema",
    required: true,
  },
});

module.exports = mongoose.model("messageSchema", messageSchema);
