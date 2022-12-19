import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"
import axios from "axios"

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
        const activityPollDB = await prisma.activity_Poll.findMany({
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
            orderBy: {
                pollcreated: "desc",
            },
        })
        return res.send(activityPollDB)
    } catch (err) {
        return res.status(404).send("Activity poll not found")
    }
})

// Set the poll applicants
allPollRoutes.post("/applyPoll", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const fName: string | undefined = req.user?.fName
        const lName: string | undefined = req.user?.lName
        const pollCreaterId: string = req.body.pollCreaterId
        const pollId: string = req.body.pollId
        const pollName: string = req.body.pollName
        const isAccepted: boolean = req.body.isAccepted
        const registerTime: Date = req.body.registerTime
        const setApply: any = { userId: userId, pollId: pollId, isAccepted: isAccepted, registerTime: registerTime }
        const name: string = fName + " " + lName
        await prisma.poll_Applicant.create({
            data: setApply,
        })
        calExp(prisma, req.user?.userId || "", "DatingPoll")
        if (name && pollName && userId && pollCreaterId) {
            axios.post("http://localhost:8000/notification/addnotiobject", {
                template: "DATING_INTERESTED",
                value: [name, pollName],
                userId: [pollCreaterId],
                module: "DATING",
                url: "/dating/poll/yourpoll/" + pollId,
                sender: userId,
            })
        }
        return res.send("OK")
    } catch (err) {
        return res.status(404).send("Activity poll went wrong")
    }
})

export default allPollRoutes
