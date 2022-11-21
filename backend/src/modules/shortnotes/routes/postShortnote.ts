import { prisma } from "@prisma/client"
import cuid from "cuid"
import { Request, Response } from "express"

const postShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const payload: any = {
            snId: cuid(),
            courseId: req.body.courseId,
            userId: user,
            isPublic: req.body.isPublic,
            snName: req.body.snName,
            snDesc: req.body.snDesc,
            snLink: req.body.snLink,
        }

        const sn = await prisma.sn_Head.create({
            data: payload,
        })
        res.send(sn)
    } catch (err) {
        console.log(err)

        return res.send(err)
    }
}

export default postShortnote
