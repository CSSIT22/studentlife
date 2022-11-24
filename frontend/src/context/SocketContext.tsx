import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import io from 'socket.io-client'
import socket, { getToken } from "src/function/socket";

type socketTypes = {
    messages: { userId: string, roomId: string, message: string }[],
    testSocket: string[]
}

const socketContext = createContext<socketTypes>({} as any)


const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setmessages] = useState<socketTypes['messages']>([])
    const [testSocket, setTestSocket] = useState<socketTypes['testSocket']>([])
    const socketIO = socket()
    useEffect(() => {
        console.log(socketIO.id)
    }, [socketIO.id])
    useEffect(() => {
        socketIO.on("connect", () => {
            console.log("Conntected")
        })
        socketIO.on("receive-message", (s: any) => {
            console.log(s)
        })
        return () => {
            socketIO.off("connect")
            socketIO.off("receive-message")

        }
    }, [])
    return <socketContext.Provider {...{ children, value: { messages, testSocket } }} />
}

export default SocketContextProvider