import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deletePeople = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const p = await prisma.sn_Access.delete({
            where: {
                snId_userId: {
                    snId: req.body.snId,
                    userId: req.body.userId,
                },
            },
        })
        res.send(p)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default deletePeople
