import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const matchesRoutes = express()
const prisma = new PrismaClient()

matchesRoutes.get("/", (_, res) => {
    return res.send("Dating Module Matches page API")
})

export default matchesRoutes