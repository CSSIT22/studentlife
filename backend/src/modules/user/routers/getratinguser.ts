import { Request, Response } from "express"

const getRating = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const { id } = req.params
        const checkRatingUser = await prisma.user_Rating.findFirst({ where: { userId: id } })
        if (checkRatingUser === null) {
            await prisma.user_Rating.create({
                data: {
                    userId: id,
                    anotherUserId: id,
                    score: 0,
                },
            })
        }

        const Rating = await prisma.user_Rating.findFirstOrThrow({ where: { userId: id }, select: { score: true } })
        res.json({
            Rating: Rating.score,
        })
    } catch (err) {
        res.status(400).send("Error To Get Your User Rating")
    }
}

export default getRating
