import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { Agent } from "http"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const discoveryRoutes = express()
const prisma = new PrismaClient()

function getAge(dateString: Date) {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

discoveryRoutes.get("/", (_, res) => {
    return res.send("Dating Module Discovery page API")
})

// Get all interest
discoveryRoutes.get("/getAllInterest", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
    try {
        const allInterestsDB = await prisma.interest.findMany()
        return res.send(allInterestsDB)
    } catch (err) {
        return res.status(404).send("Interests not found")
    }
})
// Get card queue and join with user profile, detail, user interests and filter with event, blocked user, age, faculty, gender, schedule, follow
discoveryRoutes.get("/getCards", verifyUser, async (req: Request, res: Response) => {
    // Put Pawin's code here
    try {
        const reqUserId = req.user?.userId
        const cardQueueUserId = await prisma.card_Queue.findFirst({
            where: {
                userId: reqUserId,
            },
        })

        const filterId: any = []
        const heartHistoryDB = await prisma.heart_History.findMany({
            where: {
                userId: reqUserId,
            },
        })

        const userBlockedDB = await prisma.user_Blocked.findMany({
            where: {
                userId: reqUserId,
            },
        })

        const datingOptionsDB = await prisma.dating_Options.findFirst({
            where: {
                userId: reqUserId,
            },
        })

        heartHistoryDB.map((id) => {
            filterId.push(id.anotherUserId)
        })

        userBlockedDB.map((id) => {
            filterId.push(id.anotherUserId)
        })

        const ageObtainedUser: any = []

        if (cardQueueUserId?.frontUserId && cardQueueUserId?.backUserId) {
            return res.send("Success!")
        } else {
            const userProfileDB = await prisma.user_Profile.findMany({
                where: {
                    NOT: {
                        userId: {
                            in: filterId,
                        },
                    },

                    details: {
                        NOT: {
                            userId: reqUserId,
                        },
                    },
                    datingSetting: {
                        hasCompleteTutorial: true,
                    },
                },
                select: {
                    userId: true,
                    fName: true,
                    lName: true,
                    image: true,
                    details: {
                        select: {
                            birth: true,
                            sex: true,
                        },
                    },
                    studentMajor: {
                        select: {
                            majorFaculty: {
                                select: {
                                    facultyName: true,
                                },
                            },
                        },
                    },
                    interests: {
                        select: {
                            interestId: true,
                        },
                    },
                },
            })
            console.log(datingOptionsDB)

            userProfileDB.map((user) => {
                if (user.details && datingOptionsDB?.useAge && datingOptionsDB?.ageMin && datingOptionsDB?.ageMax) {
                    if (getAge(user.details.birth) >= datingOptionsDB.ageMin && getAge(user.details.birth) <= datingOptionsDB.ageMax) {
                        ageObtainedUser.push(user)
                    }
                } else if (datingOptionsDB?.useAge == false) {
                    ageObtainedUser.push(user)
                }
            })

            const genderObtainedUser : any = []

            ageObtainedUser.map((user: any) => {
                if (datingOptionsDB?.genderPref == "Everyone" && genderObtainedUser.length != 20) {
                    genderObtainedUser.push(user)
                } else if (datingOptionsDB?.genderPref == "Male" && user.details.sex == "Male" && genderObtainedUser.length != 20) {
                    genderObtainedUser.push(user)
                } else if (datingOptionsDB?.genderPref == "Female" && user.details.sex == "Female" && genderObtainedUser.length != 20) {
                    genderObtainedUser.push(user)
                } else if (datingOptionsDB?.genderPref == "LGBTQ+" && user.details.sex == "LGBTQ+" && genderObtainedUser.length != 20) {
                    genderObtainedUser.push(user)
                }
            })

            return res.send(genderObtainedUser)
        }
    } catch (err) {
        return res.status(404).send("User profiles not found")
    }
})

// Set heart history
discoveryRoutes.post("/setHeartHistory", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const anotherUserId = req.body.anotherUserId
        const isSkipped = req.body.isSkipped

        const giveHeartId: any = []
        const giveHeartDB = await prisma.heart_History.findMany({
            where: {
                userId: userId,
            },
        })
        giveHeartDB.map((id) => {
            giveHeartId.push(id.anotherUserId)
        })

        if (userId && !giveHeartId.includes(anotherUserId)) {
            try {
                await prisma.heart_History.create({
                    data: {
                        userId: userId,
                        anotherUserId: anotherUserId,
                        isSkipped: isSkipped,
                    },
                })
            } catch (error) {
                return res.send("Duplicates")
            }
        }
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send(err)
    }
})
export default discoveryRoutes
