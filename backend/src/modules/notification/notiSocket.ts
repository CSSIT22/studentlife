import { pushNotiType } from "@apiType/notification"
import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { customeSocketPrams } from "src"
import { getSessionIdsByUserIds } from "../backendService/socketstore/store"

const notiSocket: customeSocketPrams = (socket, prisma) => {
    socket.on("push_noti", (data: pushNotiType) => {
        console.log(data.userId)
        data.userId.forEach((el) => {
            let socketids = getSessionIdsByUserIds(el)
            console.log(socketids)

            for (let id of socketids) {
                socket.to(id).emit("push_noti", data)
            }
        })
    })
}

export default notiSocket
