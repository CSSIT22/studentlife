import { PrismaClient } from "@prisma/client"
import { Timestamp } from "@redis/time-series/dist/commands"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"
// import { Room } from ".."
import axios from "axios"

const createAPollRoutes = express()
const prisma = new PrismaClient()

createAPollRoutes.get("/", (_, res) => {
    return res.send("Dating Module Create a Poll page API")
})

// Get all the poll topics
createAPollRoutes.get("/getAllTopic", verifyUser, async (req: Request, res: Response) => {
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})

// Get favorite restaurants
createAPollRoutes.get("/getFavRestaurants", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send([])
        } else {
            const favResDB = await prisma.restaurant_Favorite_By_User.findMany({
                where: {
                    userId: userId,
                },
            })
            let allRes: any = []
            const ResDB = await prisma.restaurant.findMany()
            for (let i = 0; i < ResDB.length; i++) {
                for (let j = 0; j < favResDB.length; j++) {
                    if (ResDB[i].resId == favResDB[j].resId) {
                        allRes.push(ResDB[i].resName)
                    }
                }
            }
            // console.log(allRes)
            return res.send(allRes)
        }
    } catch (err) {
        return res.status(404).send("Favorite restaurant not found")
    }
})

// Create the poll and poll topics
createAPollRoutes.post("/setPoll", verifyUser, async (req: Request, res: Response) => {
    const pollNow = await prisma.activity_Poll.findMany()
    try {
        const userId: string | undefined = req.user?.userId
        const pollName: string = req.body.pollName
        const pollPlace: string = req.body.pollPlace
        // const pollAppointAt: any = req.body.pollAppointAt
        const pollAppointAt: Timestamp = req.body.pollAppointAt
        const pollText: string = req.body.pollText
        const participantMin: number = req.body.participantMin
        const participantMax: number = req.body.participantMax
        const isOpen: boolean = req.body.isOpen
        // const pollcreated: Date = new Date(req.body.pollcreated)
        const pollTopic: any = []
        console.log(
            "NAMEEEEEEE ! " +
                pollName +
                " " +
                pollPlace +
                " " +
                pollAppointAt +
                " " +
                pollText +
                " " +
                participantMin +
                " " +
                participantMax +
                " " +
                isOpen +
                " " +
                pollTopic
        )

        const pollInfo: any = {
            userId: userId,
            pollName: pollName,
            pollPlace: pollPlace,
            pollAppointAt: pollAppointAt,
            pollText: pollText,
            participantMin: participantMin,
            participantMax: participantMax,
            isOpen: isOpen,
            // roomId: "293249324",
        }
        // console.log("HENLO! " + pollInfo.pollAppointAt)
        const poll = await prisma.activity_Poll.create({
            // data: { ...pollInfo },
            data: pollInfo,
        })
        req.body.activityInterestId.map((topic: string) => {
            pollTopic.push({ pollId: poll.pollId, activityInterestId: topic })
        })
        await prisma.poll_Interest.createMany({
            data: pollTopic,
        })
        calExp(prisma, req.user?.userId || "", "DatingPoll")
        return res.send("Success")
    } catch (err) {
        console.log(err)

        return res.status(400).send("Cannot set Option")
    }
})

export default createAPollRoutes
