import { Request, Response } from "express"
import { prisma } from "@prisma/client"

const getComments = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const cm = await prisma.sn_Head.findFirstOrThrow({
            where: {
                snId: req.params.id,
            },
            select: {
                //ต้องการแค่คั้งแค่ครง comments
                comments: {
                    include: {
                        commentor: {
                            select: {
                                fName: true,
                                lName: true,
                            },
                        },
                    },
                },
            },
        })
        const cmm = cm.comments

        res.send(cmm)
        //console.log(course)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getComments
