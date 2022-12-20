import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deleteLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const Li = await prisma.sn_Library.delete({
            where: {
                libId: req.body.libId,
            },
        })
        res.send(Li)
    } catch (err) {
        //console.log(err)
        return res.send(err)
    }
}

export default deleteLibrary
