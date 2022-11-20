import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const allPollRoutes = express()
const prisma = new PrismaClient()

allPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module All activity polls page API")
})

export default allPollRoutes
