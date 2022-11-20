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
        const deviceInfo = device.data.deviceCategory || "Unknow"
        const ip = req.ip

        const logoutResult = await prisma.logout_Info.create({
            data: {
                token: token,
                userId: userId,
                logoutId: logoutId,
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
        res.status(200).json({ token: token })
    } catch (err: any) {
        console.log(err)
        if (!req.user) res.status(403).json({ message: "unauthorized" })
        else res.status(400).json({ message: err })
    }
})

export default backendserviceRoutes
