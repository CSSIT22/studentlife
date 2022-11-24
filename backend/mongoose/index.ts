import { Message_Type } from "@prisma/client"

const mongoose = require("mongoose")

mongoose.connect("")

const Message = new mongoose.Schema({
  roomId: String,
  senderId: String,
  transId: String,
  messageType: Message_Type,
  created: {
    type: Date,
    default: () => Date.now()
  },
  isRead:{
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Message", Message)