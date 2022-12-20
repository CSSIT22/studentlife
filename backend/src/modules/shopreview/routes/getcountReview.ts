import { Request, Response } from "express"

const getcountReview = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const count = await prisma.sReview_Shop.findMany({
            select: {
                reviews: {
                    select: {
                        reviewId: true,
                        rating: true,
                        shopId: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
        })
        res.send(count)
    } catch {
        res.status(400).send("Error can't count rate")
    }
}

export default getcountReview
