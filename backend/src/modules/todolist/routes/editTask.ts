import { Request, Response } from "express"

const editTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId

    const editTask: any = {
        taskName: req.body.taskName,
        taskDesc: req.body.taskDesc,
        created: req.body.created,
        due: req.body.due,
        taskType: req.body.taskType,
    }

    try {
        await prisma.task.update({
            where: {
                taskId: req.body.taskId,
            },
            data: editTask,
        })
    } catch {
        res.status(404)
    }
}

export default editTask
