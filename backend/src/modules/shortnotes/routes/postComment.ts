import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postComment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user: any = req.user?.userId

        const cm = await prisma.sn_Comment.create({
            data: {
                snId: req.params.id,
                userId: user,
                comment: req.body.comment
            },
        })
        res.send(cm)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postComment
