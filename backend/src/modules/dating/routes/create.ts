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
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})

// Get favorite restaurants
createAPollRoutes.get("/getFavRestaurants", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send([])
        } else {
            const favResDB = await prisma.restaurant_Favorite_By_User.findMany({
                where: {
                    userId: userId,
                },
            })
            return res.send(favResDB)
        }
    } catch (err) {
        return res.status(404).send("Favorite restaurant not found")
    }
})

// Create the poll and poll topics
createAPollRoutes.post("/setPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default createAPollRoutes
