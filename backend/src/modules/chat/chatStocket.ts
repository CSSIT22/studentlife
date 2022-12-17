import { message } from "../../../mongoose/message"
import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { customeSocketPrams } from "src"
import {getSessionIdsByUserIds} from "../backendService/socketstore/store"

const chatSocket: customeSocketPrams = (socket, prisma) => {
    socket.on("send-msg", async(data:{msg:string , room_id : string , from : string ,type: string}) => {
        const ids = await prisma.user_To_Room.findMany({
            select:{
                userId:true
            },where:{
                roomId:data.room_id
            }
        })
        await message.create({roomId:data.room_id,senderId:data.from,messageType:data.type,message:data.msg})
        const Message = await message.find({
            roomId:data.room_id
        })
        const sesstion_ids = getSessionIdsByUserIds(ids.map((e)=>e.userId))
        for(let session of sesstion_ids){
            socket.to(session).emit("receive-message",Message)
        }
    })
}

export default chatSocket
