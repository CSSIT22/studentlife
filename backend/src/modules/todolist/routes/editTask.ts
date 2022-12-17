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
        folderId: req.body.folderId,
    }

    if (!req.body.taskId) {
        return res.status(400).send("Invalid body")
    }

    try {
        await prisma.task.updateMany({
            where: {
                taskId: req.body.taskId,
            },
            data: editTask,
        })
        return res.send("Success")
    } catch (err) {
        console.log(err)
        res.status(404).send("Error")
    }
}

export default editTask
