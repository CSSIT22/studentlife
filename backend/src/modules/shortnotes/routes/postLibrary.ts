import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postLibrary = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user: any = req.user?.userId

        const li = await prisma.sn_Library.create({
            data: {
                libName: req.body.libName,
                userId: user
            },
        })
        res.send(li)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postLibrary
