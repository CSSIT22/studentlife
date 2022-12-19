import { Request, Response } from "express"
import { trusted } from "mongoose"

const getmycommentDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const mycomment = await prisma.sReview_Comment.findMany({
            select: {
                commentId: true,
                reviewId: true,
                commentOf: {
                    select: {
                        reviewer: {
                            select: {
                                userId: true,
                                fName: true,
                                _count: {
                                    select: {
                                        comment: true,
                                    },
                                },
                            },
                        },
                    },
                },
                likeReceived: true,
                text: true,
                commentedAt: true,
                commentBy: {
                    select: {
                        fName: true,
                        lName: true,
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        userLike: true,
                    },
                },
            },
            where: {
                reviewId: id,
            },
            orderBy: {
                commentedAt: "desc",
            },
        })
        res.send(mycomment)
    } catch {
        res.status(400).send("Error can't find comment")
    }
}

export default getmycommentDb
