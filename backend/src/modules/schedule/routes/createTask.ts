import { Request, Response } from "express"

const createTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const body = req.body
    const taskId = req.body.taskId

    const task: any = {
        taskName: body.taskName,
        userId: userId,
        taskDesc: body.taskDesc,
        created: new Date(),
        due: new Date(body.due),
        taskType: body.taskType,
    }
    try {
        const createTask = await prisma.task.create({
            data: task,
        })
    res.send(createTask)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
export default createTask
