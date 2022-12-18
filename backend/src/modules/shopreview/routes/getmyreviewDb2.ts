import { Request, Response } from "express"

const getmyreviewDb2 = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const myreview = await prisma.sReview_Review.findMany({
            include: {
                reviewer: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
            },
            where: {
                resId: id,
            },
        })
        res.send(myreview)
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getmyreviewDb2
