import { Request, Response } from "express"

const detailTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    const user = await prisma.task.findFirst({
        where: {
            taskId: body.taskId,
            userId: userid,
        },
    })
    return res.json(user)
}

export default detailTask
