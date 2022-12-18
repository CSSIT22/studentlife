import { PrismaClient } from "@prisma/client"
import axios from "axios"
import express, { Request, Response } from "express"
import calExp from "../../user/expsystem/calExp"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourPollRoutes = express()
const prisma = new PrismaClient()

yourPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your poll page API")
})

// Get your poll and join with user profile table
yourPollRoutes.get("/getYourPoll/:pollId", verifyUser, async (req: Request, res: Response) => {
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

        const activityPollDB = await prisma.activity_Poll.findFirst({
            where: {
                pollId: pollId,
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
                    orderBy: [
                        {
                            registerTime: "desc",
                        },
                        {
                            user: {
                                fName: "asc",
                            },
                        },
                    ],
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
        return res.send(activityPollDB)
    } catch (err) {
        return res.status(404).send("Activity poll not found")
    }
})

yourPollRoutes.put("/updatePollApplicants", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId
        const pollId = req.body.pollId
        const reqUserId = req.user?.userId
        const fName = await prisma.user_Profile.findFirst({
            where: {
                userId: reqUserId,
            },
            select: {
                fName: true,
            },
        })

        const pollName = await prisma.activity_Poll.findFirst({
            where: {
                pollId: pollId,
            },
            select: {
                pollName: true,
            },
        })

        await prisma.poll_Applicant.update({
            where: {
                userId_pollId: {
                    userId: userId,
                    pollId: pollId,
                },
            },
            data: {
                isAccepted: true,
            },
        })

        calExp(prisma, req.user?.userId || "", "DatingPollJoinActivity")

        if (fName && pollName && userId && reqUserId) {
            axios.post("http://localhost:8000/notification/addnotiobject", {
                template: "DATING_ACCEPTED",
                value: [fName.fName, pollName.pollName],
                userId: [userId],
                module: "DATING",
                url: "/dating/poll/appliedpoll",
                sender: reqUserId,
            })
        }
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send("Cannot update activity poll")
    }
})

yourPollRoutes.put("/closeYourPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const pollId = req.body.pollId

        await prisma.activity_Poll.update({
            where: {
                pollId: pollId,
            },
            data: {
                isOpen: false,
            },
        })
        return res.send("Success!")
    } catch (err) {
        res.status(400).send("Cannot close your poll")
    }
})

yourPollRoutes.put("/closeAndAcceptAllYourPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const pollId = req.body.pollId
        const userIdDB = await prisma.poll_Applicant.findMany({
            where: {
                pollId: pollId,
                isAccepted: false,
            },
            select: {
                userId: true,
            },
        })

        let unacceptedUserId: string[] = []
        userIdDB.map((userId) => {
            unacceptedUserId.push(userId.userId)
        })

        await prisma.activity_Poll.update({
            where: {
                pollId: pollId,
            },
            data: {
                isOpen: false,
            },
        })

        const reqUserId = req.user?.userId
        const fName = await prisma.user_Profile.findFirst({
            where: {
                userId: reqUserId,
            },
            select: {
                fName: true,
            },
        })

        const pollName = await prisma.activity_Poll.findFirst({
            where: {
                pollId: pollId,
            },
            select: {
                pollName: true,
            },
        })

        await prisma.poll_Applicant.updateMany({
            where: {
                userId: {
                    in: unacceptedUserId,
                },
                pollId: pollId,
            },
            data: {
                isAccepted: true,
            },
        })

        for (let i = 0; i < unacceptedUserId.length; i++) {
            await calExp(prisma, req.user?.userId || "", "DatingPollJoinActivity")
        }

        if (fName && pollName && reqUserId) {
            axios.post("http://localhost:8000/notification/addnotiobject", {
                template: "DATING_ACCEPTED",
                value: [fName.fName, pollName.pollName],
                userId: unacceptedUserId,
                module: "DATING",
                url: "/dating/poll/appliedpoll",
                sender: reqUserId,
            })
        }

        return res.send("Success!")
    } catch (err) {
        return res.status(400).send("Cannot close your poll and accept all")
    }
})

yourPollRoutes.put("/deleteYourPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const pollId = req.body.pollId
        await prisma.activity_Poll.delete({
            where: {
                pollId: pollId,
            },
        })
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send("Cannot delete your poll")
    }
})

export default yourPollRoutes
