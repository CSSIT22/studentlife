import { Request, Response } from "express"
import { prisma } from "@prisma/client"

const getAccess = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const ac = await prisma.sn_Access.findMany({
            where: {
                userId: user,
            },
            select: {
                snId: true,
            },
        })

        res.send(ac)
        //console.log(ac)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getAccess
