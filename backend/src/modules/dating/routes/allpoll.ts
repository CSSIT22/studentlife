import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const allPollRoutes = express()
const prisma = new PrismaClient()

allPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module All activity polls page API")
})

// Get all poll and join with Poll applicants and user profiles table
allPollRoutes.get("/getAllPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Set the poll applicants
allPollRoutes.post("/applyPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default allPollRoutes
