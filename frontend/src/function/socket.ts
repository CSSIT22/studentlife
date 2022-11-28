import { io } from "socket.io-client"

class TokenClass {
    private message: string
    constructor(message: string) {
        this.message = message
    }
    setMessage(message: string) {
        this.message = message
    }
    getMessage() {
        return this.message
    }
}

const token = new TokenClass("")

export const setToken = (socketToken: string) => {
    token.setMessage(socketToken)
}

export const getToken = () => {
    console.log(token.getMessage)
}

const socket = () =>
    io(import.meta.env.VITE_APP_ORIGIN, {
        extraHeaders: {
            authorization: token.getMessage(),
        },
    })

export default socket
