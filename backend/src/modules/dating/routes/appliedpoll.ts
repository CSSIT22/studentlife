import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const appliedPollRoutes = express()
const prisma = new PrismaClient()

appliedPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Applied activity polls page API")
})

// Get applied poll and join with user profile and poll applicants
appliedPollRoutes.get("/getAppliedPolls", verifyUser, async (req: Request, res: Response) => {
    // Put Songnapha's code here
    try {
        const poll = await prisma.poll_Applicant.findMany({
            where: {
                userId: req.user?.userId,
            },
            include: {
                poll: {
                    include: {
                        pollCreator: true,
                        participants: true,
                        interests: {
                            include: {
                                interest: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                registerTime: "desc"
            }
        })
        return res.send(poll.map((i) => ({ ...i, poll: { ...i.poll, interests: i.poll.interests.map((j) => ({ interest: j.interest })) } })))
    } catch (err) {
        return res.status(500).send("Applied poll not found")
    }

})

export default appliedPollRoutes
