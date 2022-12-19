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
import getMember from "./router/getMember"
import deleteRoom from "./router/deleteRoom"
import createGroup from "./router/createGroup"
import editGroupProp from "./router/editGroupProp"
import leaveGroup from "./router/leaveGroup"
import joinGroup from "./router/joinGroup"
import getUserIDChatWith from "./router/getUserIDChatWith"
import postMessage from "./router/postMessage"
import getMessage from "./router/getMessage"
import inviteToGroup from "./router/inviteToGroup"
import getUserProp from "./router/getUserProp"
import getFollowList from "./router/getFollowList"
const chatRoutes = express.Router()
chatRoutes.use(express.json())

//mock-up data
// function get data

//routes

chatRoutes.get("/", getRoom)

chatRoutes.get("/spotifySearch", spotify)

chatRoutes.post("/createRoom", createRoom)

chatRoutes.post("/createGroup",createGroup)

chatRoutes.post("/joinGroup",joinGroup)

chatRoutes.get("/getUserProps",getUserProp)

chatRoutes.get("/:id", room_prop)

chatRoutes.delete("/:id/deleteRoom",deleteRoom)

chatRoutes.delete("/:id/leaveGroup",leaveGroup)

chatRoutes.get("/:id/getMessage",getMessage)

chatRoutes.post("/:id/postMessage",postMessage)

chatRoutes.get("/:id/getQuote", getQuote)

chatRoutes.get("/:id/getMember", getMember)

chatRoutes.get("/:id/getFollowList", getFollowList)

chatRoutes.get("/:id/getUserID", getUserIDChatWith)

chatRoutes.put("/:id", editRoomProp)

chatRoutes.put("/:id/editGroup",editGroupProp)

chatRoutes.post("/:id/addQuote", addQuote)

chatRoutes.post("/:id/inviteToGroup",inviteToGroup)

export default chatRoutes
