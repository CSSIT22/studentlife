import { Request, Response } from "express"
import express from "express"
import { nanoid } from "nanoid"
import { verifyUser } from "./middleware/verifyUser"
import UAParser from "ua-parser-js"
import DeviceDetector from "node-device-detector"
import { banned } from "./middleware/banned"
import { reportRequest } from "@apiType/backendService"

const backendserviceRoutes = express()

backendserviceRoutes.use(express.json())

backendserviceRoutes.post("/banneds", verifyUser, async (req: Request<any, any, reportRequest>, res: Response) => {
    const { prisma } = res
    try {
        const bannedUser = await res.prisma.ban_Status.upsert({
            where: {
                userId: req.body.bannedUserId || "",
                reason: req.body.reason,
            },
            update: {
                name: "Viola the Magnificent",
            },
            create: {
                userId: req.body.bannedUserId || "",
                banTo: req.body.banTo,
                reason: req.body.reason,
                instance: 0,
                banId: req.body.banId || "",
            },
        })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})
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
        console.log(response)
        return res.status(200).json({ tokens: response })
    } catch (err: any) {
        return res.status(400).json({ message: err })
    }
})

backendserviceRoutes.delete("/revokeTokens", verifyUser, async (req: Request, res: Response) => {
    const prisma = res.prisma

    const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: true,
    })
    const userAgent = req.headers["user-agent"] || ""
    const detectedResult = detector.detect(userAgent)
    console.log(detectedResult)

    const selectedDeviceToken = req.body.token
    const currentUserDeviceToken = req.session.id
    const isLogoutCurrentDevice = selectedDeviceToken === currentUserDeviceToken

    const device = new UAParser(req.headers["user-agent"])
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

        console.log(logoutResult)

        res.status(200).json({ token: token })
    } catch (err: any) {
        console.log(err)
        res.status(400).json({ message: err })
    }
})

export default backendserviceRoutes
