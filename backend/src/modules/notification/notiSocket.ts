import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { customeSocketPrams } from "src"

const notiSocket: customeSocketPrams = (socket, prisma) => {
    socket.on("message", (data) => {
        socket.broadcast.emit("receive-message", data)
    })
}

export default notiSocket
