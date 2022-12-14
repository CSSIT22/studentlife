import { Request, Response } from "express"

const createtask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    const task: any = {
        taskName: body.taskName,
        userId: userid,
        taskDesc: body.taskDesc,
        created: new Date(),
        due: new Date(body.due),
        taskType: body.taskType,
    }

    console.log(task)

    try {
        const createUser = await prisma.task.create({
            data: task,
        })
    } catch (e: any) {
        console.log(e)

        res.status(400).send(e.toString())
        return
    }

    return res.send("Successfully added")
}

export default createtask
