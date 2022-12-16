import { Schema, model} from "mongoose"

// mongoose.connect("mongodb://staging-mongo:s-studentlife-1212312121@modlifes.me:27016/chat")
interface Message {
  roomId: string,
  senderId: string,
  transId: string,
  messageType: ['TEXT', 'QUOTE', 'STICKER', 'RESTAURANT', 'TRANSACTION'],
  created: Date,
  isRead: string[]
}
const Message = new Schema({
  roomId: String,
  senderId: String,
  transId: String,
  messageType: ['TEXT', 'QUOTE', 'STICKER', 'RESTAURANT', 'TRANSACTION'],
  created: {
    type: Date,
    default: () => Date.now()
  },
  isRead: {
    type: Array
  }
})
const message = model<Message>('Message', Message)

export default message
