import { Request, Response } from "express"

const listfolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const result = await prisma.task_Folder.findMany({
        where: {
            userId: {
                equals: userid,
            },
        },
    })

    res.json(result)
}

export default listfolder
