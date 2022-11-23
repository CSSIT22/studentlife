import { Request, Response } from "express"

const createtask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const createTask: any = {
        taskName: body.taskName,
        taskId: body.taskId,
        taskUserId: body.user,
        taskDesc: body.taskDesc,
        created: body.created,
        due: body.due,
        taskType: body.taskType,
    }
}

export default createtask
