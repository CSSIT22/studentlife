import { Request, Response } from "express"
import { prisma } from "@prisma/client"
import axios from "axios"

const getFile = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        let x: any[] = []

        const fileId = await prisma.sn_File.findMany({
            select: {
                fileId: true,
                snId: true,
                file: true,
            },
            where: {
                snId: req.params.id,
            },
            orderBy: {
                file: {
                    fileExpired: "asc",
                },
            },
        })

        res.json(fileId)
    } catch (err) {
        return res.send(err)
    }
}
export default getFile
