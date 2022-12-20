import { Request, Response } from "express"

const getCountReviewEachRateRestaurant = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const eachRate = await prisma.sReview_Review.findMany({
            select: {
                rating: true,
            },
            where: {
                resId: id,
            },
        })
        res.send(eachRate)
    } catch (error) {
        res.status(400).send(error)
    }
}

export default getCountReviewEachRateRestaurant
