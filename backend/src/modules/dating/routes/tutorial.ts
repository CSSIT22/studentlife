import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const tutorialRoutes = express()
const prisma = new PrismaClient()

tutorialRoutes.get("/", (_, res) => {
    return res.send("Dating Module Tutorial page API")
})

export default tutorialRoutes