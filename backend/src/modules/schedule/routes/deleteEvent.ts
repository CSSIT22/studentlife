import { Request, Response } from "express"

const deleteEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    try {
        await prisma.event.findFirst({
            where: {
                eventId: req.body.eventId,
                //userId: userid,
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
        res.status(200).send("Delete Event Success")
    } catch (err) {
        res.status(404).send("Failed to delete event")
    }
}

export default deleteEvent
