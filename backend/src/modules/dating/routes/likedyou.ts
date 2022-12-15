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
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})
// Get heart history and join with user profile, detail, user interests
likedYouRoutes.get("/getHeartHistory", verifyUser, async (req: Request, res: Response) => {
    try {
        const reqUserId = req.user?.userId

        const youLikedDB = await prisma.heart_History.findMany({
            where: {
                userId: reqUserId,
            },
        })

        let userFilter: any = []

        youLikedDB.map((data) => {
            userFilter.push(data.anotherUserId)
        })

        const blockedDB = await prisma.user_Blocked.findMany({
            where: {
                userId: reqUserId,
            }
        })
        
        blockedDB.map((data) => {
            userFilter.push(data.anotherUserId)
        })

        const heartHistoryDB = await prisma.heart_History.findMany({
            where: {
                isSkipped: false,
                heartReceiver: {
                    userId: reqUserId,
                },

                heartGiver: {
                    NOT: {
                        userId: {
                            in: userFilter,
                        },
                    },
                },
            },
            select: {
                heartGiver: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                        image: true,
                        details: {
                            select: {
                                birth: true,
                                sex: true,
                            },
                        },
                        studentMajor: {
                            select: {
                                majorFaculty: true,
                            },
                        },
                        interests: {
                            select: {
                                interestId: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                heartedAt: "desc",
            },
        })

        console.log(heartHistoryDB)
        return res.send(heartHistoryDB)
    } catch (err) {
        return res.status(404).send("Heart history not found")
    }
})

// Update heart history
likedYouRoutes.put("/updateHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

export default likedYouRoutes
