import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"

const ratingRoutes = express()
const prisma = new PrismaClient()

ratingRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

// Get the previous rating
ratingRoutes.get("/getRating", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send()
        } else {
            const followDB = await prisma.follow.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    following: {
                        select: {
                            userId: true,
                            fName: true,
                            lName: true,
                            image: true,
                        },
                    },
                },
            })

            const rating = await prisma.user_Rating.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    scoreReceiver: {
                        select: {
                            userId: true,
                            fName: true,
                            lName: true,
                            image: true,
                        },
                    },
                },
            })

            const buildres: typeof rating = followDB.map((item) => {
                const rate = rating.filter((e) => e.anotherUserId === item.following.userId)
                return {
                    anotherUserId: item.following.userId,
                    score: rate.length === 0 ? 0 : rate[0].score,
                    userId: req.user?.userId || "",
                    scoreReceiver: item.following,
                }
            })

            // console.log(buildres)
            return res.send(buildres)
        }
    } catch (err) {
        return res.status(404).send("User Option not found")
    }
})

// Get the user profile join with follow table
ratingRoutes.get("/getUserProfile", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send()
        } else {
            const followDB = await prisma.follow.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    following: {
                        select: {
                            userId: true,
                            fName: true,
                            lName: true,
                            image: true,
                        },
                    },
                },
            })

            // const followingIds = followDB.map((el) => el.following.userId)

            // const rating = await prisma.user_Rating.findMany({
            //     where: {
            //         userId: userId,
            //         anotherUserId: {
            //             in: followingIds as string[],
            //         },
            //     },
            //     include: {
            //         scoreReceiver: true,
            //     },
            // })
            // return res.send(rating)
            return res.send(followDB)
        }
    } catch (err) {
        return res.status(404).send("User Rating not found")
    }
})

// Set the rating
ratingRoutes.post("/setRating", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const anotherUserId: string = req.body.anotherUserId
        const rate: number = req.body.score
        const setRate: any = { userId: userId, anotherUserId: anotherUserId, score: rate }
        // console.log("RATE " + setRate.userId + " " + setRate.anotherUserId + " " + setRate.score)
        await prisma.user_Rating.create({
            data: setRate,
        })
        calExp(prisma, req.user?.userId || "", "DatingRate")
        return res.send("OK")
    } catch {
        return res.status(400).send("Cannot set Rating")
    }
})

// Update the rating
ratingRoutes.put("/updateRating", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const anotherUserId = req.body.anotherUserId
        const rate: number = req.body.score
        const setRate: any = { userId: userId, anotherUserId: anotherUserId, score: rate }
        // console.log("RATE " + setRate.userId + " " + setRate.anotherUserId + " " + setRate.score)
        if (userId != undefined) {
            await prisma.user_Rating.delete({
                where: {
                    userId_anotherUserId: {
                        userId: userId,
                        anotherUserId: anotherUserId,
                    },
                },
            })
        }
        await prisma.user_Rating.create({
            data: setRate,
        })
        return res.send("OK")
    } catch {
        return res.status(400).send("Cannot update Rating")
    }
})

// Delete the rating
ratingRoutes.put("/deleteRating", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const anotherUserId: string = req.body.anotherUserId
        if (userId != undefined) {
            await prisma.user_Rating.delete({
                where: {
                    userId_anotherUserId: {
                        userId: userId,
                        anotherUserId: anotherUserId,
                    },
                },
            })
        }
        return res.send("OK")
    } catch {
        return res.status(400).send("Cannot delete Rating")
    }
})

export default ratingRoutes
