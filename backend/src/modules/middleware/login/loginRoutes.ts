import { Router } from "express";
import passport from "passport";
import { Request, Response } from "express";

const router = Router()

router.get("/microsoft", passport.authenticate("microsoft", {
  prompt: "select_account",
  session: false
}))

router.get("/microsoft/callback", passport.authenticate("microsoft", {
  failureRedirect: "/auth/microsoft",
  session: false
}), (req: Request, res: Response) => {
  res.json(req.user)
})

export { router as loginRoutes }