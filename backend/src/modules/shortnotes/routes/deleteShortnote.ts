import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deleteShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const sn = await prisma.sn_Head.delete({
            where: {
                snId: req.params.id,
            },
        })
        res.send(sn)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default deleteShortnote
