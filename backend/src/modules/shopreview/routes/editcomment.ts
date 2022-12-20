import { Request, Response } from "express"

const editcomment = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = req.user?.userId
    const editcomment: any = {
        commentId: req.body.commentId,
        text: req.body.text,
        // likeReceived: req.body.likeReceived,
    }
    try {
        await prisma.sReview_Comment.update({
            where: {
                commentId: req.body.commentId,
                // userId: user,
            },
            data: editcomment,
        })
        res.send("finish sending")
    } catch (err) {
        console.log(err)
        res.send("some error comment")
    }
}

export default editcomment
