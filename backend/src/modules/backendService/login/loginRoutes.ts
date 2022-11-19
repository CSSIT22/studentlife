import { Router } from "express"
import passport from "passport"
import { Request, Response } from "express"
import { verifyUser } from "../middleware/verifyUser"
import UAParser from "ua-parser-js"
import jwt from "jsonwebtoken"

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
        const { prisma } = res
        console.log(req.user?.userId)
        try {
            console.log(req.headers["user-agent"])
            const device1 = new UAParser(req.headers["user-agent"])
            const user = await prisma.user_Back.create({
                data: {
                    userId: req.user?.userId || "",
                    token: req.session.id,
                    loginSession: {
                        create: {
                            detail: {
                                create: {
                                    deviceInfo: (device1.getOS().name || "") + (device1.getOS().version || "") || "Unknow",
                                    ip: device1.getBrowser().name || "",
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

router.get("/sockettoken", verifyUser, (req: Request, res: Response) => {
    const token = jwt.sign({ userId: req.user?.userId }, process.env.COOKIE_SECRET || "")
    res.send(token)
})

export { router as loginRoutes }
