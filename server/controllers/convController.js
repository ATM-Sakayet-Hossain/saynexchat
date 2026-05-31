const conversationSchema = require("../models/conversationSchema");
const messageSchema = require("../models/messageSchema");
const userSchema = require("../models/userSchema");

const addNewFriend = async (req, res) => {
  const { email } = req.body;
  try {
    if (email === req.user.email) {
      return res.status(400).send({ message: "Try with another email" });
    }
    const friend = await userSchema.findOne({ email });
    if (!friend)
      return res.status(400).send({ error: "This email dose not exist" });
    const existingParticipent = await conversationSchema.findOne({
      $or: [
        { creator: req.user._id, participent: friend._id },
        { participent: req.user._id, creator: friend._id },
      ],
    });
    if (existingParticipent)
      return res.status(400).send({ error: "Already in friend list" });
    const createNewConv = await conversationSchema.create({
      creator: req.user._id,
      participent: friend._id,
    });
    res.status(200).send({ message: "Friend Added successfylly" });
  } catch (error) {
    console.log(error);
    re.status(500).send({ error: "Internal Server Error" });
  }
};

const conversationList = async (req, res) => {
  try {
    const conv = await conversationSchema
      .find({
        $or: [
          { creator: req.user._id },
          {
            participent: req.user._id,
          },
        ],
      })
      .populate("creator participent", "fullName avatar");

    res.status(200).send(conv);
  } catch (error) {
    console.log(error);
    re.status(500).send({ error: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { contentType = "text", content, conversation } = req.body;

    const isExistConv = await conversationSchema.findOne({ _id: conversation });
    if (!isExistConv)
      return res.status(400).send({ message: "Conversation not found!" });

    const message = await messageSchema.create({
      contentType,
      content,
      conversation,
      sender: req.user._id,
    });
    global.io.to(conversation).emit("new_message", message);
    res.status(200).send("sent");
  } catch (error) {
    console.log(error);
    re.status(500).send({ error: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  const { conversation } = req.params;
  if (!conversation)
    return res.status(400).send({ message: "Conversation not found" });
  try {
    const messagesList = await messageSchema.find({ conversation });
    res.status(200).send(messagesList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { addNewFriend, conversationList, sendMessage, getMessages };
