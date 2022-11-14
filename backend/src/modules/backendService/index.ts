import { Request, Response } from "express"
import express from "express"
import { nanoid } from "nanoid"
import UserAgent from "user-agents"
import { verifyUser } from "./middleware/verifyUser"

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
        return res.status(200).json({ tokens: result })
    } catch (err: any) {
        return res.status(400).json({ message: err })
    }
})

backendserviceRoutes.put("/revokeTokens", verifyUser, async (req: Request, res: Response) => {
    const prisma = res.prisma
    console.log(req.body.token)
    try {
        const device = new UserAgent(req.headers["user-agent"])

        const logoutId = nanoid()
        const logoutDate = Date.now().toString()
        const deviceInfo = device.data.deviceCategory || "Unknow"
        const ip = device.data.platform

        const logoutResult = await prisma.logout_Info.create({
            data: {
                logoutId: logoutId,
                userId: req.user?.userId || "",
                token: req.body.token,
                detail: {
                    create: {
                        logoutDate: logoutDate,
                        deviceInfo: deviceInfo,
                        ip: ip,
                    },
                },
            },
        })

        console.log({ logoutResult: logoutResult })

        const updateResult = await prisma.user_Back.update({
            where: {
                userId_token: {
                    userId: req.user?.userId || "",
                    token: req.body.token,
                },
            },
            data: {
                logoutSession: {
                    connect: {
                        logoutId: logoutId,
                    },
                },
            },
        })

        console.log({ logoutResult: logoutResult })

        res.status(200).json({ isRevoked: true })
    } catch (err: any) {
        if (!req.user) res.status(403).json({ isRevoked: false, message: "unauthorized" })
        else res.status(400).json({ isRevoked: false, message: err })
    }
})

export default backendserviceRoutes
