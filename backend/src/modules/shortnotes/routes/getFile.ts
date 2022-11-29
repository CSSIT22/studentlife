import { Request, Response } from "express"
import { prisma } from "@prisma/client"
import axios from "axios"


const getFile = async (req: Request, res: Response) => {
    const prisma = res.prisma
    let x: any[] = []

    const fileId = await prisma.sn_File.findMany({
        select: {
            fileId: true,
        },
        where: {
            snId: req.body.snId,
        },
    })

    res.json(fileId)
}
export default getFile