import { Request, Response } from "express"

const getFollowing = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const { id } = req.params
        const following = await prisma.follow.findMany({
            include: { following: true },
            where: {
                userId: id,
            },
        })

        res.status(200).json({ following })
    } catch (err) {
        return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/NotFound`)
    }
}

export default getFollowing
