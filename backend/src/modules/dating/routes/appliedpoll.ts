import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const appliedPollRoutes = express()
const prisma = new PrismaClient()

appliedPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Applied activity polls page API")
})

// Get applied poll and join with user profile and poll applicants
appliedPollRoutes.get("/getAppliedPolls", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
})

export default appliedPollRoutes
