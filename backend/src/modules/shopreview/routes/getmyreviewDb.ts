import { Request, Response } from "express"

const getmyreviewDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const myreview = await prisma.sReview_Review.findMany({
            select: {
                reviewId: true,
                shopId: true,
                resId: true,
                likeReceived: true,
                rating: true,
                reviewedAt: true,
                text: true,
                reviewer: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                    },
                },
                images: {
                    select: {
                        image: true,
                    },
                },
            },
            where: {
                shopId: id,
            },
            orderBy: {
                reviewedAt: "desc",
            },
        })
        res.send(myreview)
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getmyreviewDb
