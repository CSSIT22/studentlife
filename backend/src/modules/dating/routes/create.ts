import { PrismaClient } from "@prisma/client"
import { Timestamp } from "@redis/time-series/dist/commands"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"
import { nanoid } from "nanoid"

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
        const room_id = nanoid()
        const roomName = req.query.name
        const userId: string | undefined = req.user?.userId
        const pollName: string = req.body.pollName
        const pollPlace: string = req.body.pollPlace
        const pollAppointAt: Timestamp = req.body.pollAppointAt
        const pollText: string = req.body.pollText
        const participantMin: number = req.body.participantMin
        const participantMax: number = req.body.participantMax
        const isOpen: boolean = req.body.isOpen
        const pollTopic: any = []
        const user_id = await prisma.user_Profile.findUniqueOrThrow({
            select: {
                userId: true,
            },
            where: {
                userId: userId,
            },
        })
        await prisma.chat_Room.create({
            data: {
                chatColor: "#E68E5C",
                roomType: "GROUP",
                roomId: room_id,
            },
        })
        await prisma.chat_Group.create({
            data: {
                roomId: room_id,
                roomName: `${roomName}`,
            },
        })
        await prisma.user_To_Room.create({
            data: {
                userId: user_id.userId,
                roomId: room_id,
            },
        })

        const pollInfo: any = {
            userId: userId,
            pollName: pollName,
            pollPlace: pollPlace,
            pollAppointAt: pollAppointAt,
            pollText: pollText,
            participantMin: participantMin,
            participantMax: participantMax,
            isOpen: isOpen,
            roomId: room_id,
        }
        const poll = await prisma.activity_Poll.create({
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
