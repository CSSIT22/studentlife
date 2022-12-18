import { Request, Response } from "express"

const getFollowing = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const followering = await prisma.follow.findMany({
            include: { follower: true },
            where: {
                userId: userId,
            },
        })

        // res.status(200).json({ user: profile })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFollowing
