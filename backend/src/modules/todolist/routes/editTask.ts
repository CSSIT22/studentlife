import { Request, Response } from "express"

const editTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const editTask: any = {
        taskName: req.body.taskName,
        taskDesc: req.body.taskDesc,
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
        return res.send("Success")
    } catch {
        res.status(404)
    }
}

export default editTask
