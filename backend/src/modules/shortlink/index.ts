import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import shortenlink from "./route/shortenlink"
import getRedirect from "./route/getRedireect"
import { prisma } from "@prisma/client"

const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())

shortlinkRoutes.post("/generate", verifyUser, shortenlink)
shortlinkRoutes.get("/redirect", verifyUser, getRedirect)

export default shortlinkRoutes
