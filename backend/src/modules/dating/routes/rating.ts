import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const ratingRoutes = express()
const prisma = new PrismaClient()

ratingRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

// Get the previous rating
ratingRoutes.get("/getRating", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Get the user profile join with follow table
ratingRoutes.get("/getUserProfile", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send()
        } else {
            const followDB = await prisma.follow.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    following: {
                        select: {
                            userId: true,
                            fName: true,
                            lName: true,
                            image: true,
                            
                        },
                    },
                },
            })
            console.log(followDB)
            return res.send(followDB)
        }
    } catch (err) {
        return res.status(404).send("User Option not found")
    }
})

// Set the rating
ratingRoutes.post("/setRating", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Update the rating
ratingRoutes.put("/updateRating", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Delete the rating
ratingRoutes.delete("/deleteRating", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default ratingRoutes
