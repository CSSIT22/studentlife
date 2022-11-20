import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postShortnote = async (req: Request<any>, res: Response<any>) => {
    const prisma = res.prisma
    const user = req.user?.userId

    const payload: any = {
        snName: req.body.snName,
        snDesc: req.body.snDesc,
        snLink: req.body.snLink,
        courseId: req.body.snName,
        isPublic: req.body.isPublic,
        userId: user,
    }

    const sn = await prisma.sn_Head.create({
        data: payload,
    })
    res.send(sn)
}

export default postShortnote
