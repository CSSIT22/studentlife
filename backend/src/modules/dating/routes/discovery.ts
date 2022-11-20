import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const discoveryRoutes = express()
const prisma = new PrismaClient()

discoveryRoutes.get("/", (_, res) => {
    return res.send("Dating Module Discovery page API")
})

// Get all interest
discoveryRoutes.get("/getAllInterest", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})
// Get card queue and join with user profile, detail, user interests and filter with event, blocked user, age, faculty, gender, schedule, follow
discoveryRoutes.get("/getCards", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

// Set heart history
discoveryRoutes.post("/setHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})
export default discoveryRoutes
