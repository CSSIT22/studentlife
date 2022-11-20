import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const likedYouRoutes = express()
const prisma = new PrismaClient()

likedYouRoutes.get("/", (_, res) => {
    return res.send("Dating Module People who liked you page API")
})

export default likedYouRoutes
