import { Notiobject } from "@apiType/notification"
import express from "express"
import { Server as IOServer, Socket } from "socket.io"
import getUserNotiObject from "./routes/getUserNotiObject"
import markallasRead from "./routes/markallasRead"
import readNotiObject from "./routes/readNotiObject"
import getNotiUser from "./routes/getNotiUser"

import addNotiObject from "./routes/addNotiObject"
import getUserNotiObjectbyModule from "./routes/getUserNotiObjectbyModule"
import editNotiUserSetting from "./routes/editNotiUserSetting"
import getSenderImage from "./routes/getSenderImage"

let io: IOServer

const setIO = (i: IOServer) => {
    io = i
}
const notificationRoutes = express()
notificationRoutes.use(express.json())
notificationRoutes.use((req, res, next) => {
    res.io = io
    next()
})

notificationRoutes.get("/getusernotiobject", getUserNotiObject)
notificationRoutes.get("/getNotiUser", getNotiUser)
notificationRoutes.get("/getusernotiobjectbymodule/:module", getUserNotiObjectbyModule)
notificationRoutes.get("/getsenderimage/:senderId", getSenderImage)

notificationRoutes.post("/addnotiobject", addNotiObject)
notificationRoutes.post("/readnotiobject/:notiObjectId", readNotiObject)
notificationRoutes.post("/markallasread/:module", markallasRead)
notificationRoutes.post("/editnotiusersetting/:userId/:app/:email", editNotiUserSetting)
export { notificationRoutes, setIO }
