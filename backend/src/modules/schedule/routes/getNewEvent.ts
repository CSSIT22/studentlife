import { Request, Response } from "express"

const getNewEvent = async (req: Request, res: Response) => {
    const userid = req.user?.userId
    const prisma = res.prisma
    let body = req.params
    try {
        const getEvent = await prisma.event.findFirstOrThrow({
            where: {
                eventId: body.eventId,
            },
        })
        res.send(getEvent)
    } catch (err) {
        res.status(500).send(err)
    }
}
export default getNewEvent
