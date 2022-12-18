import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import shortenlink from "./route/shortenlink"
import getRedirect from "./route/getRedireect"
import { prisma } from "@prisma/client"
import customlink from "./route/customlink"
import getUserData from "./route/getUserData"
import getlinkData from "./route/getlinkData"
import savelink from "./route/savelink"

const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())
shortlinkRoutes.post("/generate", verifyUser, shortenlink)
shortlinkRoutes.post("/custom" , verifyUser , customlink)
shortlinkRoutes.get("/redirect", verifyUser, getRedirect)
shortlinkRoutes.get("/getUser", getUserData )
shortlinkRoutes.get("/getlink", getlinkData )
shortlinkRoutes.get("/savelink",savelink )


export default shortlinkRoutes
         