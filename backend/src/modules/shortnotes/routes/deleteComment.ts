import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deleteComment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const cm = await prisma.sn_Comment.delete({
            where: {
                commentId: req.body.commentId,
            },
        })
        res.send(cm)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default deleteComment
