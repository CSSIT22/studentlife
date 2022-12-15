import { Request, Response } from "express"
import { trusted } from "mongoose"

const getmycommentDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const mycomment = await prisma.sReview_Comment.findMany({
            select: {
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
            },
            where: {
                reviewId: id,
            },
        })
        res.send(mycomment)
    } catch {
        res.status(400).send("Error can't find room")
    }
}

export default getmycommentDb
