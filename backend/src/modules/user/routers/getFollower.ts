import { Request, Response } from "express"

const getFollower = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const follower = await prisma.follow.findMany({
            where: {
                anotherUserId: userId,
            },
            include: { follower: true },
        })

        // res.status(200).json({ user: profile })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFollower
