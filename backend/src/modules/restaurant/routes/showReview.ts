import { Request, Response } from "express"
const showReview = async (req: Request, res: Response) => {
    const id = req.query.resId + ""
    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: id },
            include: {
                images: true,
                reviews: {
                    include: {
                        reviewer: true,
                    },
                },
            },
        })

        res.send([restaurant])
    } catch (err) {
        res.status(400)
    }
}
export default showReview
