import express, { Request, Response } from "express"
import UserAgent from "user-agents"
import { verifyUser } from "../backendService/middleware/verifyUser"
import getProfile from "./routers/getProfile"
import getExp from "./routers/getExp"
import getaboutmeuser from "./routers/getaboutmeuser"
import editaboutmeuser from "./routers/editAboutmeuser"
import getFriendData from "./routers/getFriendData"
import getRating from "./routers/getratinguser"
import getAboutMeDetail from "./routers/getAboutMeDetail"
import changeimageuser from "./routers/changeuserimage"
import init from "./routers/init"

const userRoutes = express()

userRoutes.get("/", verifyUser, init)

userRoutes.get("/friendprofile/:id", getFriendData)

userRoutes.get("/profile/aboutme", getAboutMeDetail)

userRoutes.get("/profile/exp/:id", getExp)

userRoutes.get("/profile/ratinguser/:id", getRating)

userRoutes.get("/profile/:id", getProfile)

userRoutes.get("/profile/edit/:id", verifyUser, getaboutmeuser)

userRoutes.put("/profile/edit", editaboutmeuser)

userRoutes.get("/profile/changeuserimage/:id", changeimageuser)

export default userRoutes
