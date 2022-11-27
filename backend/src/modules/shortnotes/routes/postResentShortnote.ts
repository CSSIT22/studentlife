import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postResentShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const payload: any = {
            snId: req.body.snId,
            userId: user,
        }

        const rsn = await prisma.sn_Recent.upsert({
            where: {
                snId_userId: payload,
            },
            create: payload,
            update: {
                viewedAt: new Date(),
            },
        })
        res.send(rsn)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postResentShortnote
