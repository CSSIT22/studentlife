import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourActivityPollRoutes = express()
const prisma = new PrismaClient()

yourActivityPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your activity polls page API")
})

// Get your polls and join with user profile and poll applicants table
yourActivityPollRoutes.get("/getYourPolls", verifyUser, async (req: Request, res: Response) => {
    try {
        const reqUserId = req.user?.userId
        const pollId = req.params.pollId
        const findPollDB = await prisma.activity_Poll.findFirst({
            where: {
                // pollId: pollId,
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
                    // where: {
                    //     userId: req.user?.userId,
                    // },
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
        // console.log("WOW " + activityPollDB[0].pollName)
        return res.send(activityPollDB)
    } catch (err) {
        return res.status(404).send("Activity poll not found")
    }
})

export default yourActivityPollRoutes
