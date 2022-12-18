import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postComment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user: any = req.user?.userId

        const cm = await prisma.sn_Comment.create({
            data: {
                snId: req.body.snId,
                userId: user,
                comment: req.body.comment,
            },
        })
        const cmDetail = await prisma.user_Profile.findFirstOrThrow({
            where: {
                userId: user,
            },
            select: {
                fName: true,
                lName: true,
            },
        })
        res.send({ cm, cmDetail })
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postComment
