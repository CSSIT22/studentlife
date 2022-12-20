import { Request, Response } from "express"

const editmyreview = async (req: Request, res: Response) => {
 
    const prisma = res.prisma
    const user = req.user?.userId

    const editReview: any = {

        shopId: req.body.shopId + "",
        userId: user,
        text: req.body.text,
        rating: parseInt(req.body.rating),
    }

    try {
        await prisma.sReview_Review.update({
            where: {
                reviewId: req.body.reviewId,
            },
            data: editReview,
        })
        res.send("finish sending")
    } catch (err) {
        console.log(err)
        res.send("some error my review")
    }
}

export default editmyreview
