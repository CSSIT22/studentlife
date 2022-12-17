import { Request, Response } from "express"

const getreviewDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const review = await prisma.sReview_Review.findMany({
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
                files:{
                    select:{
                        fileId:true
                    }
                }
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
