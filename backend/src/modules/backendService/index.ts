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

backendserviceRoutes.post("/revokeTokens", verifyUser, async (req: Request, res: Response) => {
    const prisma = res.prisma
    // console.log(req.body.token)
    // console.log(req.body.userId)
    // console.log(req.ip)

    try {
        const device = new UserAgent(req.headers["user-agent"])

        const { token, userId } = req.body
        const logoutId = nanoid()
        const logoutDate = new Date()

        const userLoginDeviceInfo = await prisma.user_Back.findUniqueOrThrow({
            where: {
                userId_token: {
                    userId: userId,
                    token: token,
                },
            },
            select: {
                loginSession: {
                    select: {
                        detail: true,
                    },
                },
            },
        })
        const user = await prisma.user_Back.delete({
            where: {
                userId_token: {
                    userId: userId,
                    token: token,
                },
            },
        })
        const deviceInfo = userLoginDeviceInfo.loginSession?.detail?.deviceInfo || ""
        const ip = userLoginDeviceInfo.loginSession?.detail?.ip || ""
        const logoutResult = await prisma.logout_Info.create({
            data: {
                userId: userId,
                token: token,
                logoutId: logoutId,
                detail: {
                    create: {
                        deviceInfo: deviceInfo,
                        ip: ip,
                        logoutDate: logoutDate,
                    },
                },
            },
        })
        res.status(200).json({ token: token })
    } catch (err: any) {
        console.log(err)
        res.status(400).json({ message: err })
    }
})

export default backendserviceRoutes
