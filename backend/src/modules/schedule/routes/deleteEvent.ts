import { Request, Response } from "express"

const deleteEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)

    let event
    try {
        event = await prisma.event.findFirstOrThrow({
            where: {
                eventId: req.body.eventId,
                userId: userid,
            },
        })
    } catch (e) {
        return res.status(400).send("User has no permission")
    }

    try {
        console.log(event.assignmentId)

        if (event.assignmentId !== null) {
            await prisma.assignment.delete({
                where: {
                    assignmentId: event.assignmentId,
                },
            })
        } else {
            await prisma.event.delete({
                where: {
                    eventId: event.eventId,
                },
            })
        }

        return res.status(200).send("Delete Event Success")
    } catch (err) {
        console.log(err)

        res.status(404).send("Failed to delete event")
    }
}

export default deleteEvent
