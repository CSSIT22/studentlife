import { Request, Response } from "express"

const finishTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    try {
        await prisma.task_Check.findFirst({
            where: {
                userId: {
                    equals: userid,
                },
                taskId: {
                    equals: body.taskId,
                },
            },
        })
    } catch (e) {
        return res.status(404).send("User has no permission to check task")
    }
    try {
        await prisma.task_Check.updateMany({
            where: { taskId: body.taskId, userId: userid },
            data: { isCheck: true },
        })
    } catch (e) {
        console.log(e)
        return res.status(400).send("Failed to check task")
    }

    res.send("Update Successfully")
}

export default finishTask
