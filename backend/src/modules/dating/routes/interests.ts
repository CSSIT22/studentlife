import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const interestsRoutes = express()
const prisma = new PrismaClient()

interestsRoutes.get("/", (_, res) => {
    return res.send("Dating Module Interest page API")
})

// Get all interest
interestsRoutes.get("/getAllInterests", verifyUser, async (req: Request, res: Response) => {
    try {
        const allInterestsDB = await prisma.interest.findMany()
        res.send(allInterestsDB)
    } catch (err) {
        res.status(404).send("Interests not found")
    }
})

// Get user interests
interestsRoutes.get("/getUserInterests", verifyUser, async (req: Request, res: Response) => {
    try {
        const userInterestsDB = await prisma.user_Interest.findMany({
            where: {
                userId: req.user?.userId,
            },
        })
        res.send(userInterestsDB)
    } catch (err) {
        res.status(404).send("User interests not found")
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

        res.send("Success!")
    } catch {
        res.status(400).send("Cannot set interests")
    }
})

// Update the user interests
interestsRoutes.put("/updateUserInterests", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
})

export default interestsRoutes
