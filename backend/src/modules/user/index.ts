import express, { Request, Response } from "express"
import UserAgent from "user-agents"
import { verifyUser } from "../backendService/middleware/verifyUser"
import getProfile from "./routers/getProfile"
import getExp from "./routers/getExp"
import getaboutmeuser from "./routers/getaboutmeuser"
import editaboutmeuser from "./routers/editAboutmeuser"
import getFriendData from "./routers/getFriendData"

import init from "./routers/init"

const userRoutes = express()

userRoutes.get("/", verifyUser, init)

userRoutes.get("/friendprofile/:id", getFriendData)

userRoutes.get("/profile/exp/:id", getExp)

userRoutes.get("/profile/:id", getProfile)

userRoutes.get("/profile/edit/:id", verifyUser, getaboutmeuser)

userRoutes.post("/profile/edit", editaboutmeuser)

export default userRoutes
