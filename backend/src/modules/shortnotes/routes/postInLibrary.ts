import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postInLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        req.body.libId.forEach(async (sn: any) => {
            const payload: any = {
                libId: Number(sn),
                snId: req.body.snId,
            }

            const inli = await prisma.sn_In_Library.create({
                data: payload,
            })
            console.log(inli)
        })
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postInLibrary
