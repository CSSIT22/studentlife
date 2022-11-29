import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const likedYouRoutes = express()
const prisma = new PrismaClient()

likedYouRoutes.get("/", (_, res) => {
    return res.send("Dating Module People who liked you page API")
})

// Get all interest
likedYouRoutes.get("/getAllInterest", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})
// Get heart history and join with user profile, detail, user interests
likedYouRoutes.get("/getHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

// Update heart history
likedYouRoutes.put("/updateHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

export default likedYouRoutes
