import { Request, Response } from "express"

const insertlikeReview = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const userId = req.user ? req.user.userId : ""
        // try {
        try {
            const liker = await prisma.sReview_Review_Like.create({
                data: {
                    reviewId: req.params.id,
                    userId: userId,
                },
            })
        } catch (err) {
            await prisma.sReview_Review_Like.delete({
                where: {
                    reviewId_userId: {
                        reviewId: req.params.id,
                        userId: userId,
                    },
                },
            })
        }

        res.send(true)
    } catch (err) {
        console.error(err)
        res.status(400).send("some error")
    }
}

export default insertlikeReview
