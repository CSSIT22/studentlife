import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const discoveryRoutes = express()
const prisma = new PrismaClient()

discoveryRoutes.get("/", (_, res) => {
    return res.send("Dating Module Discovery page API")
})

export default discoveryRoutes
