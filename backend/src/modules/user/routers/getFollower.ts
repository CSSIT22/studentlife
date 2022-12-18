import { Request, Response } from "express"

export const getFollower = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const follower = await prisma.follow.findMany({
            include: { follower: true },
            where: {
                userId: userId,
            },
        })

        return res.status(200).json({ follower })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}
export default getFollower
