import { Router } from "express"
import passport from "passport"
import { Request, Response } from "express"
import UserAgent from "user-agents"
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
    (req: Request, res: Response) => {
        // console.log(req.headers["user-agent"])
        const device = new UserAgent(req.headers["user-agent"])
        // console.log(device)
        res.json({ ...req.user, ...device.data })
    }
)

export { router as loginRoutes }
