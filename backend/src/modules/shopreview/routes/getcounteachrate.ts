import { Request, Response } from "express"

const getCountEachRate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rate = req.query.rating
        const eachRate = await prisma.sReview_Review.findMany({
            where: {
                rating: parseInt(`${rate}`),
                shopId: id,
            },
            select: {
                shopId: true,
                rating: true,
            },
        })
        res.json(eachRate.length)
    } catch (error) {
        res.status(400).send(error)
    }
}

export default getCountEachRate
