import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import calExp from "../../user/expsystem/calExp"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const likedYouRoutes = express()
const prisma = new PrismaClient()

const addHours = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(result.getHours() + 7);
    return result;
}

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

// Set heart history
likedYouRoutes.post("/setHeartHistory", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const anotherUserId = req.body.anotherUserId
        const isSkipped = req.body.isSkipped

        const giveHeartId: any = []
        const giveHeartDB = await prisma.heart_History.findMany({
            where: {
                userId: userId,
            },
        })
        giveHeartDB.map((id: any) => {
            giveHeartId.push(id.anotherUserId)
        })

        if (userId && !giveHeartId.includes(anotherUserId)) {
            try {
                await prisma.heart_History.create({
                    data: {
                        userId: userId,
                        anotherUserId: anotherUserId,
                        isSkipped: isSkipped,
                        heartedAt: addHours(new Date()),
                    },
                })
                if (isSkipped == true) {
                    calExp(prisma, req.user?.userId || "", "DatingSkip")
                } else if (isSkipped == false) {
                    calExp(prisma, req.user?.userId || "", "DatingRate")
                }
            } catch (error) {
                return res.send("Duplicates")
            }
        }
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send(err)
    }
})

export default likedYouRoutes
