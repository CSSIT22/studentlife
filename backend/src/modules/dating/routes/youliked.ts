import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const youLikedRoutes = express()
const prisma = new PrismaClient()

youLikedRoutes.get("/", (_, res) => {
    return res.send("Dating Module People who you liked page API")
})

export default youLikedRoutes