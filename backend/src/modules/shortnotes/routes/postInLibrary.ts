import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postInLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const payload: any = {
            libId: parseInt(req.body.libId),
            snId: req.body.snId,
        }

        const inli = await prisma.sn_In_Library.create({
            data: payload,
        })
        console.log(inli)
        res.json(inli)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postInLibrary
