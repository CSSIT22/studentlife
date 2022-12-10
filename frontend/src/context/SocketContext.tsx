import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"
import { authContext } from "./AuthContext"
import io, { Socket } from "socket.io-client"
import socket, { getToken } from "src/function/socket"
import { sendMsg } from "src/components/chat/socketType"
import { pushNotiType } from "@apiType/notification"
import API from "src/function/API"

type socketTypes = {
    messages: { userId: string; roomId: string; message: string }[]
    testSocket: string[],
    socketIO: Socket<any, any>
}

export const socketContext = createContext<socketTypes>({} as any)

const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setmessages] = useState<socketTypes["messages"]>([])
    const [testSocket, setTestSocket] = useState<socketTypes["testSocket"]>([])
    const socketIO = socket()
    useEffect(() => {
        socketIO.on("connect", () => {
            console.log("Conntected")
        })
        socketIO.on("receive-message", (s: sendMsg) => {
            console.log(s)
        })
        socketIO.on("push_noti", (data: pushNotiType) => {
            console.log(data + "context");

            API.post("/notification/addnotiobject", {
                template: data.template,
                value: data.value,
                userId: data.userId,
                module: data.module,
                url: data.url,
                sender: data.sender
            }).then((res) => console.log(res)).catch((err) => console.log(err))
        })
        return () => {
            socketIO.off("connect")
            socketIO.off("receive-message")
            socketIO.off("push_noti")
        }
    }, [])
    return <socketContext.Provider {...{ children, value: { messages, testSocket, socketIO } }} />
}

export default SocketContextProvider
