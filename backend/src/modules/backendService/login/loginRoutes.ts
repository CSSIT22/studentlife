import { Router } from "express"
import passport from "passport"
import { Request, Response } from "express"
import UserAgent from "user-agents"
import { verifyUser } from "../middleware/verifyUser"

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
        session: true,
    }),
    verifyUser,
    async (req: Request, res: Response) => {
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
            res.redirect(process.env.SUCCESS_REDIRECT_URL || "")
        } catch (error) {
            res.status(500).send("These is an error in login")
            console.log(error)
        }
    }
)
router.get("/showtoken", (req, res) => {
    res.send(req.session.id)
})
router.get("/logout", async (req, res) => {
    const userID: string = req.user?.userId || ""
    const tokenID: string = req.session.id
    req.logOut({}, async (err) => {
        if (err) {
            return res.status(400).send("Error")
        }
        const { prisma } = res

        // รอริเเก้ db
        const user = await prisma.user_Back.delete({
            where: {
                userId_token: {
                    userId: userID,
                    token: tokenID,
                },
            },
        })

        return res.send("success")
    })
})

export { router as loginRoutes }
