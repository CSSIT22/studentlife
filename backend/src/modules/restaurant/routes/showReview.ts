import { Request, Response } from "express"
const showReview = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: id },
            include: {
                images: true,
                reviews: {
                    include: {
                        reviewBy: true,
                    },
                },
            },
        })

        res.send([restaurant])
    } catch (err) {}
}
export default showReview
