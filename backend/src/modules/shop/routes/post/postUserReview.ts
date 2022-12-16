import { Shop_Product_Review } from "@prisma/client"
import { Request, Response } from "express"

const postUserReview = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userId = req.user?.userId
        if (userId) {
            const lastReviewId = await prisma.shop_Product_Review.findMany({
                select: {
                    reviewId: true
                },
                orderBy: {
                    reviewId: 'desc'
                },
                take: 1
            })
            let newReviewId = lastReviewId[0].reviewId + 1
            const createUserReview: Shop_Product_Review = await prisma.shop_Product_Review.create({
                data: {
                    reviewId: newReviewId,
                    userId: userId,
                    productId: req.body.productId,
                    reviewName: req.body.reviewName,
                    reviewDesc: req.body.reviewDesc,
                    reviewRating: req.body.reviewRating,
                    reviewAt: new Date().toLocaleString(),
                    image: req.body.image
                }
            })
            return res.send(createUserReview)
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default postUserReview