import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const payload: any = {
            libName: req.body.libName,
            userId: user,
        }

        const li = await prisma.sn_Library.create({
            data: payload,
        })
        res.send(li)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postLibrary
