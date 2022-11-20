import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourPollRoutes = express()
const prisma = new PrismaClient()

yourPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your poll page API")
})

export default yourPollRoutes
