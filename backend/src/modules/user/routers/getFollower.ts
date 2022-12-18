import { Request, Response } from "express"

const getFollower = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const Follower = await prisma.follow.findMany({
            include: { follower: true },
            where: {
                anotherUserId: req.params.id,
            },
        })

        // if (isBlocked) {
        //     return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
        // }

        res.status(200).json({ follower: Follower })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFollower
