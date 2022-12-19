import { Request, Response } from "express"

const createtask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    const users = body.userIds || []
    users.push(userid)

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
        const createTask = await prisma.task.create({
            data: task,
        })

        console.log(users)

        for (let el in users) {
            const taskcheck: any = {
                taskId: createTask.taskId,
                userId: users[el],
                isCheck: false,
            }

            const createTaskCheck = await prisma.task_Check.create({
                data: taskcheck,
                //   {
                //     taskId: createTask.taskId,
                //     userId: el,
                //     isCheck: false,
                // },
            })
        }
    } catch (e: any) {
        console.log(e)

        res.status(400).send(e.toString())
        return
    }

    return res.send("Successfully Created")
}

export default createtask
