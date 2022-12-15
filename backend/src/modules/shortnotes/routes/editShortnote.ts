import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const editShortnote = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user: any = req.user?.userId

        const nsn = await prisma.sn_Head.update({
            where: {
                snId: req.body.snId,
            },
            data: {
                course: {
                    connectOrCreate: {
                        where: {
                            courseId: req.body.courseId,
                        },
                        create: {
                            courseName: req.body.courseId,
                            lecturer: "unknown",
                        },
                    },
                },
                snName: req.body.snName,
                snDesc: req.body.snDesc,
            },
        })
        req.body.fileId.forEach(async (f: any) => {
            const file = await prisma.sn_File.delete({
                where: {
                    snId_fileId: {
                        fileId: f,
                        snId: req.body.snId,
                    },
                },
            })
        })
        res.send(nsn)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default editShortnote
