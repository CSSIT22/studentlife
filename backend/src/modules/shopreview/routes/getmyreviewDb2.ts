import { Request, Response } from "express"

const getmyreviewDb2 = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const myreview = await prisma.sReview_Restaurant_Review.findMany({})
        res.send(myreview)
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getmyreviewDb2
