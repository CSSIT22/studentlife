import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const matchesRoutes = express()
const prisma = new PrismaClient()

matchesRoutes.get("/", (_, res) => {
    return res.send("Dating Module Matches page API")
})

// Get matches people from heart history joined with user profile table
matchesRoutes.get("/getMatches", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
    try {
        const reqUserId = req.user?.userId
        const hearthistoryDB = await prisma.heart_History.findMany({
            where: {
                userId: reqUserId,
                isSkipped: false,
            },
        })
        return res.send(hearthistoryDB)
    }catch (err) {
        return res.status(404).send("Match not found")
    }
})

export default matchesRoutes
