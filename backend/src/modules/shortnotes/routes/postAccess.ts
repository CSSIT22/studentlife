import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const postAccess = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        let people = req.body.people

        people.forEach(async (p: any) => {
            const pId = await prisma.user_Profile.findFirstOrThrow({
                where: {
                    studentId: p,
                },
                select: {
                    userId: true,
                },
            })
            const payload: any = {
                snId: req.body.snId,
                userId: pId.userId,
            }

            const ac = await prisma.sn_Access.create({
                data: payload,
            })
            console.log(ac)
        })
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}

export default postAccess
