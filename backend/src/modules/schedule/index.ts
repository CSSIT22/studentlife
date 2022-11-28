import { prisma } from "@prisma/client"
import express from "express"
import createEvent from "./routes/createEvent"
import editEvent from "./routes/editevent"
import getEditedevent from "./routes/getEditedevent"
import readFromDBRoutes from "./routes/readFromDB"
import deleteEvent from "./routes/deleteEvent"


const scheduleRoutes = express()

scheduleRoutes.use(express.json())

scheduleRoutes.get("/",(_, res) => {
    return res.send("Schedule Module API")
})

export type Event = {
    eventId: string
    eventName: string
    startTime: Date
    endTime: Date
    startDate: Date
    endDate: Date
    eventDesc: string
    eventType: Eventtype[]
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
        eventDesc: "Go with PM to discuss blaaaaaaaaaaaaaaaaa",
        startTime: new Date(),
        endTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        eventType: [
            { id: "1", name: "Course" },
            { id: "2", name: "Assignment" },
            { id: "3", name: "Activity" },
        ],
    },
]

export const getEvent = () => {
    return events
}

export const setEvent = (newData: Event[]) => {
    events = newData
}

scheduleRoutes.get("/createEvent", createEvent)
scheduleRoutes.get("/editEvent", editEvent)
scheduleRoutes.get("/deleteEvent", deleteEvent)
scheduleRoutes.get("/getEditedevent", getEditedevent)
scheduleRoutes.get("/readFromDBRoutes", readFromDBRoutes)

//event: id, name, startdate, enddate, starttime, endtime, eventtype_id, description_id
//timetable: calendar_id, event_id, selecteddate
//eventtype: course, assignment, activity
//course: course, title, lecturer
//assignment: courseid, name
//activity: name

// scheduleRoutes.get("/addnewevent/:id", (req, res) => {
//     const id = req.params.id
//     res.send("Hello " + id)
// })

// scheduleRoutes.get("/searchevent/:id", (req, res) => {
//     const id = req.params.id
//     let selectedevent: Event | null = null
//     events.forEach((event) => {
//         if (event.id == id) {
//             selectedevent = event
//         }
//     })
//     if (selectedevent != null) {
//         return res.send(selectedevent)
//     }
//     return res.status(404).send("Event not found")
//     res.send("Search event " + id)
// })

// scheduleRoutes.get("/getevent", (req, res) => {
//     res.send(events)
// })

// scheduleRoutes.post("/editevent", (req, res) => {
//     const id = req.body.id
//     const name = req.body.name
//     let editedEvent: Event | null = null
//     // const description = req.body.description
//     // const starttime = req.body.starttime
//     // const endtime = req.body.endtime
//     const newdata = events.map((event) => {
//         if (event.id == id) {
//             editedEvent = { id: id, name: name }
//             return { id: id, name: name }
//         }
//         return event
//     })
//     // console.log(newdata)
//     events = newdata
//     res.send("Edit event" + editedEvent)
// })

export default scheduleRoutes
