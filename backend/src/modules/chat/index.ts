import { Room_Type } from "@prisma/client"
import express from "express"
import editproperty from "./router/editproperty"
import getRoom from "./router/getRoom"
import room_prop from "./router/getRoomProp"
const chatRoutes = express.Router()
chatRoutes.use(express.json())

//mock-up data
// function get data

//routes

chatRoutes.get("/", getRoom)

chatRoutes.get("/:id", room_prop)

chatRoutes.post("/:id", editproperty)

export default chatRoutes
