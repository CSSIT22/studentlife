import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

const notiSocket = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    socket.on("message", (data) => {
        socket.broadcast.emit("receive-message", data)
    })
}

export default notiSocket
