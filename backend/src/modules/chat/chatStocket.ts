import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

const chatSocket = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {}

export default chatSocket
