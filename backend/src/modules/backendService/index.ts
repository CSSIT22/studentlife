import { Request, Response } from "express"
import express from "express"
import { nanoid } from "nanoid"
import { verifyUser } from "./middleware/verifyUser"
import UAParser from "ua-parser-js"
import DeviceDetector from "node-device-detector"

const backendserviceRoutes = express()

backendserviceRoutes.use(express.json())

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
                        ip: device.getBrowser().name || "",
                        deviceInfo: detectedResult.device.type || "Unknown",
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
