import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"
// import { Event, getEvent, setEvent } from ".."

// const editEvent = (req: Request, res: Response) => {
//     const eventId = req.body.eventId
//     const eventName = req.body.eventName
//     const startTime = req.body.startTime
//     const endTime = req.body.endTime
//     const eventDesc = req.body.eventDesc
//     const eventType = req.body.eventType
//     let editedEvent: Event | null = null
//     const newData = getEvent().map((Event) => {
//         if (Event.eventId == eventId) {
//             Event.eventName = eventName
//             Event.startTime = startTime
//             Event.endTime = endTime
//             Event.eventDesc = eventDesc
//             Event.eventType = eventType
//             editedEvent = Event
//         }
//         return Event
//     })
//     setEvent(newData)
//     res.send(editedEvent)
// }

const editEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId

    const editEvent: any = {
        eventName: req.body.eventName,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        eventDesc: req.body.eventDesc,
        eventType: req.body.Eventtype,
    }

    try {
        await prisma.event.update({
            where: {
                eventId: req.body.eventId,
            },
            data: editEvent,
        })
    } catch {
        res.status(404)
    }
}

export default editEvent
