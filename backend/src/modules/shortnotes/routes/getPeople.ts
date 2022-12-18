import { Request, Response } from "express"

const getPeople = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId

        const sn: any = await prisma.sn_Head.findFirstOrThrow({
            where: {
                snId: req.params.id,
            },
            select: {
                owner: true,
            },
        })

        const p: any = await prisma.sn_Access.findMany({
            where: {
                snId: req.params.id,
                NOT: {
                    userId: sn.owner.userId,
                },
            },
            select: {
                accessBy: {
                    select: {
                        userId: true,
                        studentId: true,
                        fName: true,
                        lName: true,
                    },
                },
            },
            orderBy: {
                accessBy: {
                    studentId: "asc",
                },
            },
        })

        res.send(p)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getPeople
