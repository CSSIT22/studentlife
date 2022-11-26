import express, { Request, Response } from "express"
import UserAgent from "user-agents"
import { verifyUser } from "../backendService/middleware/verifyUser"
import getProfile from "./routers/getProfile"
import getExp from "./routers/getExp"
import getaboutmeuser from "./routers/getaboutmeuser"

import init from "./routers/init"

const userRoutes = express()

userRoutes.get("/", verifyUser, init)

userRoutes.get("/profile/exp", getExp)

userRoutes.get("/profile/aboutme", verifyUser, getaboutmeuser)

userRoutes.get("/profile/:id", getProfile)

export default userRoutes
