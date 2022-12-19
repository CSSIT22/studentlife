import { Request, Response } from "express"

const deleteTask = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)
    try {
        await prisma.task.findFirst({
            where: {
                taskId: req.body.taskId,
                userId: userid,
            },
        })
    } catch (e) {
        return res.status(400).send("User has no permission")
    }

    try {
        await prisma.task.delete({
            where: {
                taskId: req.body.taskId,
            },
        })
        res.status(200).send("Delete Task Success")
    } catch (err) {
        return res.status(400)
    }
}

export default deleteTask
