import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
<<<<<<< Updated upstream
import shortenlink from "./route/shortenlink"
import getRedirect from "./route/getRedireect"
import { prisma } from "@prisma/client"
import customlink from "./route/customlink"
=======
import { PrismaClient } from '@prisma/client'
import shortenlink from "./route/shortenlink"
const prisma = new PrismaClient()
>>>>>>> Stashed changes

const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())
shortlinkRoutes.post("/generate", verifyUser, shortenlink)
shortlinkRoutes.post("/custom" , verifyUser , customlink)
shortlinkRoutes.get("/redirect", verifyUser, getRedirect)

<<<<<<< Updated upstream
=======
shortlinkRoutes.post("/generate", verifyUser,shortenlink)

shortlinkRoutes.get("/", async (req, res) => {
    const prisma = res.prisma
})
>>>>>>> Stashed changes
export default shortlinkRoutes
