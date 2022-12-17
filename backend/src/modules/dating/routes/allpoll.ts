import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const allPollRoutes = express()
const prisma = new PrismaClient()

allPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module All activity polls page API")
})

allPollRoutes.get("/getAllPollUserId", verifyUser, async (req: Request, res: Response) => {
    try {
        const reqUserId = req.user?.userId
        return res.send(reqUserId)
    } catch (err) {
        return res.status(404).send("Your Id not found")
    }
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
            // where: {
            //     pollId: pollId,
            //     userId: req.user?.userId,
            // },
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
                    where: {
                        user: {
                            userId: req.user?.userId,
                        },
                    },
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
                        registerTime: "asc",
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
        // console.log("WOW " + activityPollDB[0].participants.length)
        return res.send(activityPollDB)
    } catch (err) {
        return res.status(404).send("Activity poll not found")
    }
})

// Set the poll applicants
allPollRoutes.post("/applyPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const pollId: string = req.body.pollId
        const isAccepted: boolean = req.body.isAccepted
        const registerTime: Date = req.body.registerTime
        const setApply: any = { userId: userId, pollId: pollId, isAccepted: isAccepted, registerTime: registerTime }
        console.log(setApply)
        await prisma.poll_Applicant.create({
            data: setApply,
        })
        return res.send("OK")
    } catch (err) {
        return res.status(404).send("Activity poll went wrong")
    }
})

export default allPollRoutes
