import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const allPollRoutes = express()
const prisma = new PrismaClient()

allPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module All activity polls page API")
})

// Get all poll and join with Poll applicants and user profiles table
allPollRoutes.get("/getAllPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const reqUserId = req.user?.userId
        const pollId = req.params.pollId
        const findPollDB = await prisma.activity_Poll.findFirst({
            where: {
                pollId: pollId,
                userId: reqUserId,
            },
            select: {
                pollId: true,
            },
        })

        if (!findPollDB?.pollId) {
            return res.send()
        }

        const activityPollDB = await prisma.activity_Poll.findMany({
            where: {
                pollId: pollId,
                userId: req.user?.userId,
            },
            select: {
                pollCreator: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                        image: true,
                    },
                },
                pollId: true,
                pollName: true,
                pollText: true,
                participantMin: true,
                participantMax: true,
                pollAppointAt: true,
                pollPlace: true,
                isOpen: true,
                participants: {
                    select: {
                        isAccepted: true,
                        user: {
                            select: {
                                userId: true,
                                fName: true,
                                lName: true,
                                image: true,
                            },
                        },
                    },
                    orderBy: {
                        registerTime: "desc",
                    },
                },
                interests: {
                    select: {
                        interest: {
                            select: {
                                interestName: true,
                            },
                        },
                    },
                },
            },
        })
        console.log("WOW " + activityPollDB)
        return res.send(activityPollDB)
    } catch (err) {
        return res.status(404).send("Activity poll not found")
    }
})

// Set the poll applicants
allPollRoutes.post("/applyPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default allPollRoutes
