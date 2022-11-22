import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const payload: any = {
            course: req.body.courseId,
            owner: req.body.userId,
            isPublic: req.body.isPublic,
            snName: req.body.snName,
            snDesc: req.body.snDesc,
            snLink: req.body.snLink,
            //https://stackoverflow.com/questions/68874214/how-to-use-connectorcreate-with-many-to-many-in-prisma
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
