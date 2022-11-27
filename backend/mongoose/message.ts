// import { Message_Type } from "@prisma/client"

// import { Schema, model} from "mongoose"

// // mongoose.connect("mongodb://staging-mongo:s-studentlife-1212312121@modlifes.me:27016/chat")
// interface Message {
//   roomId: string,
//   senderId: string,
//   transId: string,
//   messageType: Message_Type,
//   created: Date,
//   isRead: string[]
// }
// const Message = new Schema({
//   roomId: String,
//   senderId: String,
//   transId: String,
//   messageType: Message_Type,
//   created: {
//     type: Date,
//     default: () => Date.now()
//   },
//   isRead: {
//     type: Array
//   }
// })
// const message = model<Message>('Message', Message)

// export default message