import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { customeSocketPrams } from "src"

const airdropSocket: customeSocketPrams = (socket, prisma) => {
    socket.on("upload", (data) => {
        socket.broadcast.emit("newupload")
    })
}

export default airdropSocket
