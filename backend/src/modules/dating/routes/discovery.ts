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
            if (
                user.details &&
                datingOptionsDB?.useAge &&
                datingOptionsDB?.ageMin &&
                datingOptionsDB?.ageMax &&
                user.userId != cardQueueUserId?.frontUserId &&
                user.userId != cardQueueUserId?.backUserId
            ) {
                if (getAge(user.details.birth) >= datingOptionsDB.ageMin && getAge(user.details.birth) <= datingOptionsDB.ageMax) {
                    ageObtainedUser.push(user)
                }
            } else if (
                datingOptionsDB?.useAge == false &&
                user.details?.birth &&
                user.userId != cardQueueUserId?.frontUserId &&
                user.userId != cardQueueUserId?.backUserId
            ) {
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

        if (!cardQueueUserId?.frontUserId && !cardQueueUserId?.backUserId) {
            facultyObtainedUser = facultyObtainedUser.slice(0, 50)
        } else if (!cardQueueUserId?.frontUserId || !cardQueueUserId?.backUserId) {
            let facultyFront;
            if(facultyObtainedUser[facultyObtainedUser.length - 1]) {
                facultyFront = await facultyObtainedUser[facultyObtainedUser.length - 1]
            }

            let facultyBack;
            if(facultyObtainedUser[facultyObtainedUser.length - 2]) {
                facultyBack = await facultyObtainedUser[facultyObtainedUser.length - 2]
            }

            if(facultyObtainedUser.length >= 50) {
                facultyObtainedUser = facultyObtainedUser.slice(0, 48)
            }        
            else {
                facultyObtainedUser = facultyObtainedUser.slice(0, facultyObtainedUser.length-2)
            } 

            if (cardQueueUserId?.frontUserId) {
                if(facultyBack) {
                    facultyObtainedUser.push(facultyBack)
                }
                const frontUserDB = await prisma.user_Profile.findFirst({
                    where: {
                        userId: cardQueueUserId.frontUserId,
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
                facultyObtainedUser.push(frontUserDB)
            } else if (cardQueueUserId?.backUserId) {
                const backUserDB = await prisma.user_Profile.findFirst({
                    where: {
                        userId: cardQueueUserId.backUserId,
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
                facultyObtainedUser.push(backUserDB)
                facultyObtainedUser.push(facultyFront)
            } 

        } else {
            facultyObtainedUser = facultyObtainedUser.slice(0, 48)
            const backUserDB = await prisma.user_Profile.findFirst({
                where: {
                    userId: cardQueueUserId.backUserId,
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
            facultyObtainedUser.push(backUserDB)
            const frontUserDB = await prisma.user_Profile.findFirst({
                where: {
                    userId: cardQueueUserId.frontUserId,
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
            facultyObtainedUser.push(frontUserDB)
        }
        if (!cardQueueUserId?.frontUserId && facultyObtainedUser.length > 0) {
            const frontId = facultyObtainedUser[facultyObtainedUser.length - 1].userId
            let backId
            if (facultyObtainedUser[facultyObtainedUser.length - 2]?.userId) {
                backId = facultyObtainedUser[facultyObtainedUser.length - 2].userId
            }
            if(cardQueueUserId?.backUserId && facultyObtainedUser.length > 0) {
                const frontId = facultyObtainedUser[facultyObtainedUser.length - 1].userId
                const data: any = {
                    frontUserId: frontId,
                }
                await prisma.card_Queue.update({
                    where: {
                        userId: reqUserId
                    },
                    data: {
                        frontUserId: frontId
                    }
                })
            }
            else if (facultyObtainedUser.length > 1) {
                const data: any = {
                    userId: reqUserId,
                    frontUserId: frontId,
                    backUserId: backId,
                }
                await prisma.card_Queue.create({
                    data: data,
                })
            } else if (facultyObtainedUser.length > 0) {
                const data: any = {
                    userId: reqUserId,
                    frontUserId: frontId,
                    backUserId: null,
                }
                await prisma.card_Queue.create({
                    data: data,
                })
            }
        }
        if (!cardQueueUserId?.backUserId && facultyObtainedUser.length > 1) {
            const backId = facultyObtainedUser[facultyObtainedUser.length - 2].userId
            if(cardQueueUserId?.frontUserId) {
                await prisma.card_Queue.update({
                    where: {
                        userId: reqUserId,
                    },
                    data: {
                        backUserId: backId,
                    },
                })
            }

            if (!cardQueueUserId?.frontUserId) {
                let frontId
                if (facultyObtainedUser[facultyObtainedUser.length - 1]) {
                    frontId = facultyObtainedUser[facultyObtainedUser.length - 1].userId
                }
                await prisma.card_Queue.update({
                    where: {
                        userId: reqUserId,
                    },
                    data: {
                        frontUserId: frontId,
                    },
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

// Set queue
discoveryRoutes.put("/setQueue", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        await prisma.card_Queue.update({
            where: {
                userId: userId,
            },
            data: {
                frontUserId: req.body.frontUserId,
            },
        })
        if (req.body.backUserId) {
            await prisma.card_Queue.update({
                where: {
                    userId: userId,
                },
                data: {
                    backUserId: req.body.backUserId,
                },
            })
        }

        return res.send("Success!")
    } catch (err) {
        return res.status(400).send(err)
    }
})

// Delete queue
discoveryRoutes.delete("/deleteQueue", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        await prisma.card_Queue.delete({
            where: {
                userId: userId,
            },
        })
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send(err)
    }
})

// update front queue
discoveryRoutes.put("/updateFrontQueue", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const data: any = {
            userId: userId,
            frontUserId: req.body.frontUserId,
            backUserId: null,
        }
        await prisma.card_Queue.delete({
            where: {
                userId: userId,
            },
        })
        await prisma.card_Queue.create({
            data: data,
        })
        return res.send("Success!")
    } catch (err) {
        return res.status(400).send(err)
    }
})

export default discoveryRoutes
