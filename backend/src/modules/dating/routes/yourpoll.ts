import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourPollRoutes = express()
const prisma = new PrismaClient()

yourPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your poll page API")
})

// Get your poll and join with user profile table
yourPollRoutes.get("/getYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

// Get poll applicants and join with user profile table
yourPollRoutes.get("/getPollApplicants", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.put("/updatePollApplicants", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.put("/closeYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.put("/closeAndAcceptAllYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.delete("/deleteYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

export default yourPollRoutes
