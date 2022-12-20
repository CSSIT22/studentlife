import { Request, Response } from "express"

const getCountReviewEachRate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rate = req.query.rating
        const eachRate = await prisma.sReview_Review.findMany({
            select: {
                rating: true,
            },
            where: {
                shopId: id,
            },
        })
        res.send(eachRate)
    } catch (error) {
        res.status(400).send(error)
    }
}

export default getCountReviewEachRate
