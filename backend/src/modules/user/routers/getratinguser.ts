import { Request, Response } from "express"

const getRating = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        const checkRatingUser = await prisma.user_Rating.findFirst({ where: { userId } })
        if (checkRatingUser === null) {
            await prisma.user_Rating.create({
                data: {
                    userId: userId,
                    anotherUserId: userId,
                    score: 0,
                },
            })
        }

        const Rating = await prisma.user_Rating.findFirstOrThrow({ where: { userId }, select: { score: true } })
        res.json({
            exp: Rating.score,
        })
    } catch (err) {
        res.status(400).send("Error To Get Your User Rating")
    }
}

export default getRating
