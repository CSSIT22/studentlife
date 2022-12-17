import { prisma } from "@prisma/client"
import express from "express"
import createEvent from "./routes/createEvent"
import editEvent from "./routes/editevent"
import deleteEvent from "./routes/deleteEvent"
import getNewEvent from "./routes/getNewEvent"
import createTask from "./routes/createTask"

const scheduleRoutes = express()

scheduleRoutes.use(express.json())

// scheduleRoutes.put("/createEvent", (req, res) => {
//     const eventId = req.body.eventId
//     const eventName = req.body.eventName
//     const startTime = req.body.startTime
//     const endTime = req.body.endTime
//     const startDate = req.body.startDate
//     const endDate = req.body.endDate
//     const eventDesc = req.body.eventDesc
//     const eventType = req.body.eventType

//     res.send({
//         success: true,
//         eventName: eventName,
//         eventId: eventId,
//         startTime: startTime,
//         endTime: endTime,
//         startDate: startDate,
//         endDate: endDate,
//         eventDesc: eventDesc,
//         eventType: eventType,
//     })
// })

export type Event = {
    eventId: string
    eventName: string
    stTime: Date
    endTime: Date
    // startDate: Date
    // endDate: Date
    desc: string
    eventTypeId: Eventtype[]
}

export type Eventtype = {
    name: string
    id: string
}

export let eventType: Eventtype[] = [
    { id: "1", name: "Course" },
    { id: "2", name: "Assignment" },
    { id: "3", name: "Activity" },
]

export let events: Event[] = [
    {
        // userId: "dswd484982sdx4waK",
        eventId: "asdwadsdf",
        eventName: "Meeting with PM",
        desc: "Go with PM to discuss blaaaaaaaaaaaaaaaaa",
        stTime: new Date(),
        endTime: new Date(),
        // startDate: new Date(), //createDate
        // endDate: new Date(),
        eventTypeId: [{ id: "1", name: "Course" }],
    },
]

export const getEvent = () => {
    return events
}

export const setEvent = (newData: Event[]) => {
    events = newData
}

scheduleRoutes.post("/editEvent", editEvent)
scheduleRoutes.post("/createEvent", createEvent)
scheduleRoutes.post("/createTask", createTask)
scheduleRoutes.post("/deleteEvent", deleteEvent)
scheduleRoutes.get("/getNewEvent/:eventId", getNewEvent)

export default scheduleRoutes
