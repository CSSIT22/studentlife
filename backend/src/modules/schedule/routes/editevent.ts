import { Request, Response } from "express"

const editEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const editEvent: any = {
        eventName: req.body.eventName,
        stTime: req.body.stTime,
        endTime: req.body.endTime,
        desc: req.body.eventDesc,
        eventType: req.body.Eventtype,
    }

    try {
        await prisma.event.update({
            where: {
                eventId: req.body.eventId,
            },
            data: editEvent,
        })
        return res.send("Success")
    } catch {
        res.status(404)
    }
}

export default editEvent

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
