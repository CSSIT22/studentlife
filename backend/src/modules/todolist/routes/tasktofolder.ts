import { Request, Response } from "express"

const tasktoFolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    try {
        await prisma.task.findFirst({
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
        res.status(404).send("User has no permission to move task to folder")
    }
    try {
        await prisma.task.update({
            where: { taskId: body.taskId },
            data: { folderId: body.folderId },
        })
    } catch (e) {
        res.status(400).send("Failed to move task")
    }

    res.send("Task added to Folder Successfully")
}

export default tasktoFolder
