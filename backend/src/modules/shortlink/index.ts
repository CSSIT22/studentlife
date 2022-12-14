import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import shortenlink from "./route/shortenlink"
import getRedirect from "./route/getRedirect"
import { prisma } from "@prisma/client"
import customlink from "./route/customlink"
import getUserData from "./route/getUserData"
import getlinkData from "./route/getlinkData"
import checkpassword from "./route/checkpassword"
import deletelink from "./route/deletelink"
import funcsavelink from "./route/funcsavelink"
import getlink from "./route/getlink"
import deletesavelink from "./route/deletesavelink"


const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())
shortlinkRoutes.post("/generate", verifyUser, shortenlink)
shortlinkRoutes.post("/custom", verifyUser, customlink)
shortlinkRoutes.post("/funcsavelink",funcsavelink )
shortlinkRoutes.get("/redirect", verifyUser, getRedirect)
shortlinkRoutes.post("/checkpassword", checkpassword)
shortlinkRoutes.get("/getUser", getUserData)
shortlinkRoutes.get("/getlink", getlinkData)
shortlinkRoutes.get("/getsavelink",getlink)
shortlinkRoutes.post("/deletelink", verifyUser, deletelink)
shortlinkRoutes.post("/deletesavelink", verifyUser, deletesavelink)



export default shortlinkRoutes
