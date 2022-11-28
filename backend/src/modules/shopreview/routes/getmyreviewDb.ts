import { Request, Response } from "express"

const getmyreviewDb = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const myreview = await prisma.sReview_Shop_Review.findMany({})
        res.send(myreview)
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getmyreviewDb
