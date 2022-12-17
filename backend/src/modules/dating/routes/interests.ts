import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"

const interestsRoutes = express()
const prisma = new PrismaClient()

interestsRoutes.get("/", (_, res) => {
    return res.send("Dating Module Interest page API")
})

// Get all interest
interestsRoutes.get("/getAllInterests", async (req: Request, res: Response) => {
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})

// Get user interests
interestsRoutes.get("/getUserInterests", async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send([])
        } else {
            const userInterestsDB = await prisma.user_Interest.findMany({
                where: {
                    userId: userId,
                },
            })
            return res.send(userInterestsDB)
        }
    } catch (err) {
        return res.status(404).send("User interests not found")
    }
})

// Set the user interests
interestsRoutes.post("/setUserInterests", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const payload: any = []
        req.body.interestId.map((interest: number) => {
            payload.push({ userId: userId, interestId: interest })
        })
        await prisma.user_Interest.createMany({
            data: payload,
        })

        await prisma.dating_Enroll.update({
            where: {
                userId: userId,
            },
            data: {
                hasCompleteSetting: true,
            },
        })
        calExp(prisma, req.user?.userId || "", "DatingInterest")
        return res.send("Success!")
    } catch {
        return res.status(400).send("Cannot set interests")
    }
})

// Update the user interests
interestsRoutes.put("/updateUserInterests", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const payload: any = []
        req.body.interestId.map((interest: number) => {
            payload.push({ userId: userId, interestId: interest })
        })
        await prisma.user_Interest.deleteMany({
            where: {
                userId: userId,
            },
        })
        await prisma.user_Interest.createMany({
            data: payload,
        })

        return res.send("Success!")
    } catch {
        return res.status(400).send("Cannot update interests")
    }
})

interestsRoutes.delete("/deleteUserInterests", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        await prisma.user_Interest.deleteMany({
            where: {
                userId: userId,
            },
        })
        return res.send("Success!")
    } catch {
        return res.status(400).send("Cannot delete interests")
    }
})

export default interestsRoutes
