import { Schema, model } from "mongoose"

// mongoose.connect("mongodb://staging-mongo:s-studentlife-1212312121@modlifes.me:27016/chat")
interface Message {
    roomId: string
    senderId: string
    message: string
    messageType: ["TEXT", "QUOTE", "STICKER", "RESTAURANT", "TRANSACTION"]
    created: Date
}
const Message = new Schema({
    roomId: String,
    senderId: String,
    message: String,
    messageType: ["TEXT", "QUOTE", "STICKER", "RESTAURANT", "TRANSACTION"],
    created: {
        type: Date,
        default: () => Date.now(),
    },
})

export const message = model<Message>("Message", Message)
