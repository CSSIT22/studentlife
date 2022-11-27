import { PrismaClient } from "@prisma/client"
import { defaultMaxListeners } from "events"
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
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})
// Get card queue and join with user profile, detail, user interests and filter with event, blocked user, age, faculty, gender, schedule, follow
discoveryRoutes.get("/getCards", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
    try {
        const reqUserId = req.user?.userId
        const cardQueueUserId = await prisma.card_Queue.findFirst({
            where: {
                userId: reqUserId,
            },
        })

        console.log(cardQueueUserId)
        if (cardQueueUserId?.frontUserId && cardQueueUserId?.backUserId) {
            return res.send("Success!")
        } else {
            const userProfileDB = await prisma.user_Profile.findMany({
                take: 20,
                where: {
                    details: {
                        NOT: {
                            userId: reqUserId,
                        },
                    },
                    datingSetting: {
                        hasCompleteTutorial: true,
                    },
                },
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
                            majorFaculty: {
                                select: {
                                    facultyName: true,
                                },
                            },
                        },
                    },
                    interests: {
                        select: {
                            interestId: true,
                        },
                    },
                },
            })
            console.log(userProfileDB)
            return res.send(userProfileDB)
        }
    } catch (err) {
        return res.status(404).send("User profiles not found")
    }
})

// Set heart history
discoveryRoutes.post("/setHeartHistory", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})
export default discoveryRoutes
