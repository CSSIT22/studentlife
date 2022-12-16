import { Request, Response } from "express"

const getmyreviewDb = async (req: Request, res: Response) => {
    // try {
    //     const id = req.params.id
    //     const prisma = res.prisma
    //     const myreview = await prisma.sReview_Shop_Review.findMany({
    //         include: {
    //             reviewBy: {
    //                 select: {
    //                     fName: true,
    //                     lName: true,
    //                 },
    //             },
    //         },
    //         where: {
    //             shopId: id,
    //         },
    //     })
    //     res.send(myreview)
    // } catch {
    //     res.status(400).send("Error can't find room")
    // }
}
export default getmyreviewDb
