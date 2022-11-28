import { Request, Response } from "express"

const getmycommentDb = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const mycomment = await prisma.sReview_Comment.findMany({})
        res.send(mycomment)
    } catch {
        res.status(400).send("Error can't find room")
    }
}

export default getmycommentDb
