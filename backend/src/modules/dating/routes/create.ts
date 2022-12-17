import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const createAPollRoutes = express()
const prisma = new PrismaClient()

createAPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Create a Poll page API")
})

// Get all the poll topics
createAPollRoutes.get("/getAllTopic", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Get favorite restaurants
createAPollRoutes.get("/getFavRestaurants", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Create the poll and poll topics
createAPollRoutes.post("/setPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default createAPollRoutes
