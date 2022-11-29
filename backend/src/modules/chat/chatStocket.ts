import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { customeSocketPrams } from "src"

const chatSocket: customeSocketPrams = (socket, prisma) => {
    socket.on("send-msg",(data)=>{
        socket.broadcast.emit("receive-message",data)
    })
}

export default chatSocket
