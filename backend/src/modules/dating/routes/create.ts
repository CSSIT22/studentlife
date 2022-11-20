import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const createAPollRoutes = express()
const prisma = new PrismaClient()

createAPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Create a Poll page API")
})

createAPollRoutes.get("/getAllTopics", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

createAPollRoutes.get("/getFavRestaurants", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

createAPollRoutes.post("/setTopics", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

createAPollRoutes.post("/setPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default createAPollRoutes
