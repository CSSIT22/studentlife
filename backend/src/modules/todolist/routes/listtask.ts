import { Request, Response } from "express"

const listtask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const result = await prisma.task.findMany({
        where: {
            userId: {
                equals: userid,
            },
        },
    })

    res.json(result)
}

export default listtask
