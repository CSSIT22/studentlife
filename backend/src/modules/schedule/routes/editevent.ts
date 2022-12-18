import { Request, Response } from "express"
// import getNewEvent from "./getNewEvent"
// import { getEvent, setEvent, Event, events } from "../index"

const editEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const editEvent: any = {
        eventName: req.body.eventName,
        stTime: req.body.stTime,
        endTime: req.body.endTime,
        desc: req.body.desc,
        eventTypeId: req.body.eventTypeId,
        place: req.body.place,
    }

    if (!req.body.eventId) {
        return res.status(400).send("Invaid")
    }

    try {
        await prisma.event.updateMany({
            where: {
                eventId: req.body.eventId,
            },
            data: editEvent,
        })
        return res.send(editEvent)
    } catch (err) {
        console.log(err)
        res.status(404).send("Error")
    }
}

export default editEvent
