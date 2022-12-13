import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { Agent } from "http"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"

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

        const facultyPrefDB = await prisma.faculty_Pref.findMany({
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
                // datingSetting: {
                //     hasCompleteSetting: true,
                // },
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
                        majorFaculty: true,
                    },
                },
                interests: {
                    select: {
                        interestId: true,
                    },
                },
            },
        })

        userProfileDB.map((user) => {
            if (user.details && datingOptionsDB?.useAge && datingOptionsDB?.ageMin && datingOptionsDB?.ageMax) {
                if (getAge(user.details.birth) >= datingOptionsDB.ageMin && getAge(user.details.birth) <= datingOptionsDB.ageMax) {
                    ageObtainedUser.push(user)
                }
            } else if (datingOptionsDB?.useAge == false && user.details?.birth) {
                ageObtainedUser.push(user)
            }
        })

        const genderObtainedUser: any = []

        ageObtainedUser.map((user: any) => {
            if (datingOptionsDB?.genderPref == "Everyone") {
                if (user.details.sex == "Male" || user.details.sex == "Female" || user.details.sex == "LGBTQ+") genderObtainedUser.push(user)
            } else if (datingOptionsDB?.genderPref == "Male" && user.details.sex == "Male") {
                genderObtainedUser.push(user)
            } else if (datingOptionsDB?.genderPref == "Female" && user.details.sex == "Female") {
                genderObtainedUser.push(user)
            } else if (datingOptionsDB?.genderPref == "LGBTQ+" && user.details.sex == "LGBTQ+") {
                genderObtainedUser.push(user)
            }
        })

        let facultyObtainedUser: any = []
        genderObtainedUser.map((user: any) => {
            facultyPrefDB.map((faculty: any) => {
                if (faculty.facultyPref == user.studentMajor.majorFaculty.facultyId && !facultyObtainedUser.includes(user)) {
                    facultyObtainedUser.push(user)
                }
            })
        })

        var currentIndex = facultyObtainedUser.length,
            temporaryValue,
            randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = facultyObtainedUser[currentIndex]
            facultyObtainedUser[currentIndex] = facultyObtainedUser[randomIndex]
            facultyObtainedUser[randomIndex] = temporaryValue
        }

        facultyObtainedUser = facultyObtainedUser.slice(0, 50)
        if(!(cardQueueUserId?.frontUserId) && facultyObtainedUser.length > 0) {
            const frontId = facultyObtainedUser[facultyObtainedUser.length-1].userId
            if(!cardQueueUserId?.backUserId) {
                const data: any = {
                    userId: reqUserId,
                    frontUserId: frontId,
                    backUserId: null
                }
                await prisma.card_Queue.create({
                    data: data
                })
            }
        }
        if(!(cardQueueUserId?.backUserId) && facultyObtainedUser.length > 1) {
            const backId = facultyObtainedUser[facultyObtainedUser.length-2].userId
            if(!cardQueueUserId?.frontUserId) {
                await prisma.card_Queue.update({
                    where: {
                        userId: reqUserId
                    },
                    data: {
                        backUserId: facultyObtainedUser[facultyObtainedUser.length-2].userId
                    }
                })
            }

        }

        return res.send(facultyObtainedUser)
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
                if (isSkipped == true) {
                    calExp(prisma, req.user?.userId || "", "DatingDiscoveryLeft")
                } else if (isSkipped == false) {
                    calExp(prisma, req.user?.userId || "", "DatingDiscoveryRight")
                }
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
