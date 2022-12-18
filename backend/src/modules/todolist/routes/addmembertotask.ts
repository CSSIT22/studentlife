import { Request, Response } from "express"

const addMemberToTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const result = await prisma.user_Profile.findFirstOrThrow({
        where: {
            studentId: {
                equals: body.studentId,
            },
        },
    })

    const task: any = {
        taskId: body.taskId,
        userId: result.userId,
        isCheck: false,
    }

    try {
        const createTask = await prisma.task_Check.create({
            data: task,
        })
    } catch (err) {
        console.log(err)
        res.status(400).send("error while adding taskcheck")
        return
    }
    return res.send("Successfully Added")
}

export default addMemberToTask
