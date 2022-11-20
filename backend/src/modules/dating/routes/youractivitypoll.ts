import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourActivityPollRoutes = express()
const prisma = new PrismaClient()

yourActivityPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your activity polls page API")
})

// Get your polls and join with user profile and poll applicants table
yourActivityPollRoutes.get("/getYourPolls", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default yourActivityPollRoutes
