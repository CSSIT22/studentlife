import { Request, Response } from "express"

const deleteTask = async (req: Request, res: Response) => {
    const prisma = res.prisma

    try {
        await prisma.task.delete({
            where: {
                taskId: req.body.taskId,
            },
        })

        res.status(200).send("Delete Task Success")
    } catch (err) {
        res.status(404)
    }
}

export default deleteTask
