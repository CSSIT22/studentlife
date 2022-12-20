import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deleteSnInLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const sn = await prisma.sn_In_Library.deleteMany({
            where: {
                libId: req.body.libId,
                snId: req.body.snId,
            },
        })
        // console.log(req.body.libId)
        // console.log(req.body.snId)

        res.send(sn)
    } catch (err) {
        //console.log(err)
        return res.send(err)
    }
}

export default deleteSnInLibrary
