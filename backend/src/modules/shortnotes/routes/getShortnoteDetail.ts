import { Request, Response } from "express"
import { prisma } from "@prisma/client"

const getShortnoteDetail = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const snd = await prisma.sn_Head.findFirstOrThrow({
            where: {
                snId: req.params.id,
            },
            include: {
                course: true,
                owner: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
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
                userAccess: true,
            },
        })
        res.send(snd)
        //console.log(course)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getShortnoteDetail
