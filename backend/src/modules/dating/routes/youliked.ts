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
})

// Get heart history and join with user profile, detail, user interests
youLikedRoutes.get("/getHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
})

export default youLikedRoutes
