import { Router } from "express"
import passport from "passport"
import { NextFunction, Request, Response } from "express"
import { verifyUser } from "../middleware/verifyUser"
import jwt from "jsonwebtoken"
import DeviceDetector from "node-device-detector"

const router = Router()

router.get(
    "/microsoft",
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next()
        console.log("already login")
        return res.redirect(process.env.SUCCESS_REDIRECT_URL || "")
    },
    passport.authenticate("microsoft", {
        prompt: "select_account",
        session: true,
    })
)

router.get(
    "/microsoft/callback",
    passport.authenticate("microsoft", {
        failureRedirect: "/auth/microsoft",
        session: true,
    }),
    async (req: Request, res: Response) => {
        const { prisma } = res
        try {
            const bannedUser = await res.prisma.ban_Status.findFirst({
                where: {
                    userId: req.user?.userId || "",
                    instance: {
                        gte: 10,
                    },
                },
            })
            if (bannedUser && bannedUser.banTo > new Date()) {
                return res.redirect(`${process.env.SUCCESS_REDIRECT_URL || ""}/auth`)
            }
            console.log(req.headers["user-agent"])
            const detector = new DeviceDetector({
                clientIndexes: true,
                deviceIndexes: true,
                deviceAliasCode: true,
            })
            const userAgent = req.headers["user-agent"] || ""
            const detectedResult = detector.detect(userAgent)
            console.log(detectedResult)
            const user = await prisma.user_Back.create({
                data: {
                    userId: req.user?.userId || "",
                    token: req.session.id,
                    loginSession: {
                        create: {
                            detail: {
                                create: {
                                    loginDate: new Date(),
                                    deviceInfo: detectedResult.device.type || "Unknown",
                                    ip: req.ip,
                                    tokenExpired: req.session.cookie.expires || Date.now().toString(),
                                },
                            },
                        },
                    },
                },
            })
            // console.log("Login success: ", req.session.id)
            res.redirect(process.env.SUCCESS_REDIRECT_URL || "")
        } catch (error) {
            res.status(500).send("These is an error in login ")
            console.log(error)
        }
    }
)
// router.get("/showtoken", (req, res) => {
//     res.send(req.session.id)
// })
router.get("/logout", async (req, res) => {
    const userid = req.user?.userId || ""
    const sessid = req.sessionID

    const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: true,
    })
    const userAgent = req.headers["user-agent"] || ""
    const detectedResult = detector.detect(userAgent)
    // console.log(detectedResult)

    req.logOut({}, async (err) => {
        if (err) {
            return res.status(400).send("Error")
        }
        try {
            const { prisma, redis } = res

            await prisma.logout_Info.create({
                data: {
                    userId: userid,
                    token: sessid,
                    detail: {
                        create: {
                            deviceInfo: detectedResult.device.type || "Unknown",
                            ip: req.ip,
                            logoutDate: new Date(),
                        },
                    },
                },
            })

            await prisma.login_Info.delete({
                where: {
                    userId_token: {
                        userId: userid,
                        token: sessid,
                    },
                },
            })

            redis.DEL(`sess:${req.session.id}`)

            return res.send(true)
        } catch (error) {
            res.status(500).send("These is an error in logout")
            console.log(error)
        }
    })
})

router.get("/sockettoken", verifyUser, (req: Request, res: Response) => {
    const token = jwt.sign({ userId: req.user?.userId }, process.env.COOKIE_SECRET || "")
    res.send(token)
})

export { router as loginRoutes }
