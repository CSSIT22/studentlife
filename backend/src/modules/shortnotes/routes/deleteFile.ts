import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deleteFile = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const file = await prisma.sn_File.delete({
            where: {
                snId_fileId: {
                    fileId: req.body.fileId,
                    snId: req.body.snId,
                },
            },
        })
        res.send(file)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default deleteFile
