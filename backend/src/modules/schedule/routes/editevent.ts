import { Request, Response } from "express"
import getNewEvent from "./getNewEvent"
import { getEvent, setEvent, Event, events } from "../index"

const editEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const editEvent: any = {
        eventName: req.body.eventName,
        stTime: req.body.stTIme,
        endTime: req.body.endTime,
        desc: req.body.desc,
        eventTypeId: req.body.eventTypeId,
        hostAt: {
            connectOrCreate: {
                create: {
                    placeId: body.placeId,
                    building: "test",
                    room: "123",
                },
                where: {
                    placeId: body.placeId,
                },
            },
        },
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

    //******************************************************************************/

    // const eventId = req.body.eventId
    // const eventName = req.body.eventName
    // const stTime = req.body.stTime
    // const endTime = req.body.endTime
    // const desc = req.body.desc
    // const eventTypeId = req.body.eventTypeId

    // let editEvent: Event | null = null
    // const newdata = getEvent().map((event) => {
    //     if (eventId == eventId) {
    //         editEvent = {
    //             eventId: eventId,
    //             eventName: eventName,
    //             stTime: stTime,
    //             endTime: endTime,
    //             desc: desc,
    //             eventTypeId: eventTypeId,
    //         }
    //         return {}
    //     }
    //     return event
    // })
    // setEvent(newdata)

    // res.send(editEvent)
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
