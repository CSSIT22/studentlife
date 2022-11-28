import { Room_Type } from "@prisma/client"
import express from "express"
// import editproperty from "./router/editproperty"
import getRoom from "./router/getRoom"
import room_prop from "./router/getRoomProp"
import spotify from "./router/spotifySearch"
import editRoomProp from "./router/editRoomProp"
import getQuote from "./router/getQuote"
import addQuote from "./router/addQuote"
import createRoom from "./router/createRoom"
const chatRoutes = express.Router()
chatRoutes.use(express.json())

//mock-up data
// function get data

//routes

chatRoutes.get("/", getRoom)

chatRoutes.get("/spotifySearch",spotify)

chatRoutes.post("/createRoom", createRoom)

chatRoutes.get("/:id", room_prop)

chatRoutes.get("/:id/getQuote", getQuote)

chatRoutes.post("/:id", editRoomProp)

chatRoutes.post("/:id/addQuote", addQuote)


export default chatRoutes
