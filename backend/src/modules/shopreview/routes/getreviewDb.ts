import { Request, Response } from "express"

const getreviewDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const review = await prisma.sReview_Review.findMany({
            include: {
                restaurantReview: {
                    select: {
                        reviewedAt: true,
                        text: true,
                        rating: true,
                        likeReceived: true,
                        reviewBy: {
                            select: {
                                fName: true,
                                lName: true,
                            },
                        },
                    },
                },
                shopReview: {
                    select: {
                        reviewedAt: true,
                        text: true,
                        rating: true,
                        likeReceived: true,
                        reviewBy: {
                            select: {
                                fName: true,
                                lName: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        image: true,
                    },
                },
            },
            where: {
                reviewId: id,
            },
        })
        res.send(review)
    } catch {
        res.status(400).send("Error can't find reviewId")
    }
}

export default getreviewDb
