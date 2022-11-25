import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const sn = await prisma.sn_Head.create({
            data: {
                snId: req.body.snId,
                courseId: req.body.courseId,
                created: req.body.created,
                userId: req.body.user,
                isPublic: req.body.isPublic,
                snName: req.body.snName,
                snDesc: req.body.snDesc,
                snLink: req.body.snLink,
            },
        })
        res.send(sn)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postShortnote
