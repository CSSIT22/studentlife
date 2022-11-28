import { Notiobject } from "@apiType/notification"
import express from "express"
import getUserNotiObject from "./routes/getUserNotiObject"
import markallasRead from "./routes/markallasRead"
import readNotiObject from "./routes/readNotiObject"
import getNotiUser from "./routes/getNotiUser"

//mockup data
import { DESCRIPTION } from "./routes/mockupData/descTest"
import { USER } from "./routes/mockupData/userProfile"
import addNotiObject from "./routes/addNotiObject"
import getValue from "./routes/getValue"
import getUserNotiObjectbyModule from "./routes/getUserNotiObjectbyModule"
import editNotiUserSetting from "./routes/editNotiUserSetting"

const notificationRoutes = express()
notificationRoutes.use(express.json())

notificationRoutes.get("/getusernotiobject", getUserNotiObject)
notificationRoutes.get("/getNotiUser", getNotiUser)
notificationRoutes.get("/getvalue", getValue)
notificationRoutes.get("/getusernotiobjectbymodule/:module", getUserNotiObjectbyModule)

notificationRoutes.post("/addnotiobject", addNotiObject)
notificationRoutes.post("/readnotiobject/:notiObjectId", readNotiObject)
notificationRoutes.post("/markallasread/:module", markallasRead)
notificationRoutes.post("/editnotiusersetting/:app/:email", editNotiUserSetting)
export default notificationRoutes
