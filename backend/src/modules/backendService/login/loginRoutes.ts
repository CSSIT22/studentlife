import { Router } from "express"
import passport from "passport"
import { Request, Response } from "express"
import UserAgent from "user-agents"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get(
    "/microsoft",
    passport.authenticate("microsoft", {
        prompt: "select_account",
        session: true,
    })
)

router.get(
    "/microsoft/callback",
    passport.authenticate("microsoft", {
        failureRedirect: "/auth/microsoft",
        successRedirect: process.env.SUCCESS_REDIRECT_URL,
        session: true,
    }),
    async (req: Request, res: Response) => {
        //console.log(req.headers["user-agent"])
        const device = new UserAgent(req.headers["user-agent"])
        const { prisma } = res
        console.log(req.user?.userId)
        try {
            const user = await prisma.user_Back.create({
                data: {
                    userId: req.user?.userId || "",
                    token: req.session.id,
                    loginSession: {
                        create: {
                            detail: {
                                create: {
                                    deviceInfo: device.data.deviceCategory || "Unknow",
                                    ip: device.data.platform,
                                    tokenExpired: req.session.cookie.expires || Date.now().toString(),
                                },
                            },
                        },
                    },
                },
            })
        } catch (error) {
            res.status(500).send("These is error is login")
            console.log(error)
        }

        console.log(device.data)
        res.json({ ...req.user, ...device.data })
    }
)

export { router as loginRoutes }
