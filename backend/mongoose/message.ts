import { Message_Type } from "@prisma/client"

import mongoose from "mongoose"

// mongoose.connect("mongodb://staging-mongo:s-studentlife-1212312121@modlifes.me:27016/chat")

const Message = new mongoose.Schema({
  roomId: String,
  senderId: String,
  transId: String,
  messageType: Message_Type,
  created: {
    type: Date,
    default: () => Date.now()
  },
  isRead: {
    type: Array
  }
})

module.exports = mongoose.model("Message", Message)