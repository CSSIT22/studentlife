import { Request, Response } from "express"

const getFollow = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const profile = await prisma.user_Profile.findUniqueOrThrow({ where: { userId } })
        res.status(200).json({ user: profile })
        console.log(profile)
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFollow
