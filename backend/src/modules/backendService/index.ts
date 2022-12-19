import { Request, Response } from "express"
import express from "express"
import { nanoid } from "nanoid"
import { verifyUser } from "./middleware/verifyUser"
import DeviceDetector from "node-device-detector"
import { reportRequest } from "@apiType/backendService"

const backendserviceRoutes = express()

backendserviceRoutes.use(express.json())

backendserviceRoutes.post("/reportword", verifyUser, async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const countWord = await prisma.word_Report.aggregate({
            _count: {
                word: true,
            },
        })
        if (countWord._count.word >= 10) {
            const result = await prisma.filtered_Word.create({
                data: {
                    word: req.body.word,
                    wordReportId: countWord._count.word + 1,
                },
            })
        } else {
            const result = await prisma.word_Report.create({
                data: {
                    word: req.body.word,
                    userId: req.user?.userId || "",
                    detail: {
                        create: {
                            reason: req.body.reason || "",
                            roomId: req.body.roomId,
                        },
                    },
                },
            })
        }
        res.status(200).json({ message: "Report Success" })
    } catch (err: any) {
        return res.status(400).json({ message: err })
    }
})

backendserviceRoutes.post("/banuser", verifyUser, async (req: Request<any, any, reportRequest>, res: Response) => {
    let currentDate = new Date()
    const banDate = currentDate.setMonth(currentDate.getMonth() + 1)
    const banTo = new Date(banDate)
    try {
        const bannedUser = await res.prisma.ban_Status.upsert({
            where: {
                userId_reason: {
                    userId: req.body.data.bannedUserId,
                    reason: req.body.data.reason,
                },
            },
            update: {
                instance: {
                    increment: 1,
                },
            },
            create: {
                userId: req.body.data.bannedUserId || "",
                banTo: banTo,
                reason: req.body.data.reason,
                instance: 1,
            },
        })
        res.status(200).json({ message: "ban report successs" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
})
// backendserviceRoutes.get("/test", filterWord, (req, res) => {
//     res.send("you passed the filter word")
// })

backendserviceRoutes.get("/tokens", verifyUser, async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const result = await prisma.login_Info.findMany({
            where: {
                userId: req.user?.userId || "",
            },
            include: {
                detail: true,
            },
        })
        let response: any[] = []
        result.forEach((item) => {
            response.push({
                ...item,
                currentDevice: item.token === req.session.id,
            })
        })
        // console.log(response)
        return res.status(200).json({ tokens: response })
    } catch (err: any) {
        return res.status(400).json({ message: err })
    }
})

backendserviceRoutes.delete("/revokeTokens", verifyUser, async (req: Request, res: Response) => {
    const { prisma, redis } = res

    const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: true,
    })
    const userAgent = req.headers["user-agent"] || ""
    const detectedResult = detector.detect(userAgent)
    // console.log(detectedResult)

    const selectedDeviceToken = req.body.token
    const currentUserDeviceToken = req.session.id
    const isLogoutCurrentDevice = selectedDeviceToken === currentUserDeviceToken

    const { token, userId } = req.body
    const logoutId = nanoid()
    const logoutDate = new Date()

    if (isLogoutCurrentDevice) {
        return res.status(200).json({ isLogoutCurrentDevice: isLogoutCurrentDevice })
    }

    try {
        const logoutResult = await prisma.logout_Info.create({
            data: {
                userId: userId,
                token: token,
                logoutId: logoutId,
                detail: {
                    create: {
                        deviceInfo: detectedResult.device.type || "Unknown",
                        ip: req.ip,
                        logoutDate: logoutDate,
                    },
                },
            },
        })

        await prisma.login_Info.delete({
            where: {
                userId_token: {
                    userId: userId,
                    token: token,
                },
            },
        })

        redis.DEL(`sess:${token}`)

        // console.log(logoutResult)

        res.status(200).json({ token: token })
    } catch (err: any) {
        console.log(err)
        res.status(400).json({ message: err })
    }
})

export default backendserviceRoutes
