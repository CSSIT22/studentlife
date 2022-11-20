import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const appliedPollRoutes = express()
const prisma = new PrismaClient()

appliedPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Applied activity polls page API")
})

export default appliedPollRoutes
