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
        placeId: req.body.placeId,
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
        res.send(editEvent)
        return res.send("Success")
    } catch (err) {
        console.log(err)
        res.status(404).send("Error")
    }
}

export default editEvent

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

//******************************************************************************/

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

//******************************************************************************/

// const updatePlace = await prisma.event.updateMany({
//     where: {
//         eventId: req.body.eventId,
//     },
//     data: {
//         placeId: req.body.placeId,
//     },
// })

// const editPlace: any = {
//     hostAt: {
//         connectOrCreate: {
//             create: {
//                 placeId: body.placeId,
//                 building: "test",
//                 room: "123",
//             },
//             where: {
//                 placeId: body.placeId,
//             },
//         },
//     },
// }

//******************************************************************************/

// try {
//     const placeId = await prisma.event_Place.findFirstOrThrow({
//         where: {
//             placeId: req.body.placeId,
//         },
//         select: {
//             placeId: body.placeId,
//         },
//     })
// } catch {
//     const createPlace = await prisma.event_Place.create({
//         data: {
//             placeId: req.body.placeId,
//             building: "",
//             room: "",
//         },
//     })

//     const createEventPlace = await prisma.event.create({
//         data: {
//             placeId: req.body.placeId,
//         },
//     })
// }
