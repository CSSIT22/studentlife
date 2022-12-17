import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"

const tutorialRoutes = express()
const prisma = new PrismaClient()

tutorialRoutes.get("/", (_, res) => {
    return res.send("Dating Module Tutorial page API")
})

// Get the user profile
tutorialRoutes.get("/getUserProfile", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send({ fName: "Guest", lName: "Guest" })
        } else {
            const user_ProfileDB = await prisma.user_Profile.findFirstOrThrow({
                where: {
                    userId: userId,
                },
                select: {
                    fName: true,
                    lName: true,
                },
            })
            return res.send(user_ProfileDB)
        }
    } catch (err) {
        return res.status(404).send("User profiles not found")
    }
})

// Set the dating enroll
tutorialRoutes.post("/setDatingEnroll", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId) {
            const payload = {
                userId: userId,
                hasCompleteTutorial: true,
                hasCompleteSetting: false,
            }
            const findUser = await prisma.dating_Enroll.findFirst({
                where: {
                    userId: userId,
                },
            })
            if (!findUser) {
                await prisma.dating_Enroll.create({ data: payload })
                calExp(prisma, req.user?.userId || "", "DatingTuT")
                return res.send("Success!")
            } else {
                return res.send("Success!")
            }
        } else {
            return res.status(404).send("User not found")
        }
    } catch (err) {
        return res.status(400).send("Cannot create hasCompleteTutorial")
    }
})
export default tutorialRoutes
