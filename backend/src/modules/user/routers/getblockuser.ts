import { Request, Response } from "express"

const getblockuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const isBlocked = await prisma.user_Blocked.findOne({
            include: { anotherUserId: true },
            where: {
                anotherUserId: true,
            },
        })

        if (isBlocked) {
            return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
        }

        // res.status(200).json({ user: profile })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getblockuser
