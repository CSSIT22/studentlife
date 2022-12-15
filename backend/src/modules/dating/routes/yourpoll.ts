import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const yourPollRoutes = express()
const prisma = new PrismaClient()

yourPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Your poll page API")
})

// Get your poll and join with user profile table
yourPollRoutes.get("/getYourPoll/:pollId", verifyUser, async (req: Request, res: Response) => {
    try {
        const pollId = req.params.pollId
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
                    }
                },
                pollId: true,
                pollName: true,
                pollText: true,
                participantMin: true,
                participantMax: true,
                pollAppointAt: true,
                pollPlace: true,
                participants: {
                    select: {
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
                        registerTime: "desc"
                    }
                },
                interests: {
                    select: {
                        interest: {
                            select: {
                                interestName: true
                            }
                        }
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
    // Put Pawin's code here
})

yourPollRoutes.put("/closeYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.put("/closeAndAcceptAllYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

yourPollRoutes.delete("/deleteYourPoll", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

export default yourPollRoutes
