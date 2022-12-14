import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const youLikedRoutes = express()
const prisma = new PrismaClient()

youLikedRoutes.get("/", (_, res) => {
    return res.send("Dating Module People who you liked page API")
})

// Get all interest
youLikedRoutes.get("/getAllInterest", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})

// Get heart history and join with user profile, detail, user interests
youLikedRoutes.get("/getHeartHistory", verifyUser, async (req: Request, res: Response) => {
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
    } catch (err) {
        return res.status(404).send("Heart History not found")
    }
})

export default youLikedRoutes
