import axios from "axios"
import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"

const createEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId || ""
    const body = req.body
    const eventId = req.body.eventId

    // Event is the table from db
    try {
        console.log(body)

        const assignment = await prisma.assignment.create({
            data: {
                assignmentName: body.assignmentName,
                courseId: body.courseId,
            },
        })
        const createEvent = await prisma.event.create({
            data: {
                userId: userId,
                eventName: body.eventName,
                stTime: new Date(body.stTime),
                endTime: new Date(body.endTime),
                desc: body.desc,
                eventTypeId: body.eventTypeId,
                place: body.place,
                courseId: body.courseId,
                assignmentId: assignment.assignmentId,
            },
        })
        const eventId = await prisma.event.findFirst({
            where: {
                eventId: body.eventId,
            },
        })
        const createEventType = await prisma.event_Type.create({
            data: {
                eventTypeId: body.eventTypeId,
                eventType: body.event_Type,
            },
        })
        const isNoti = req.body.isNoti
        if (createEvent && isNoti) {
            let eventName = createEvent.eventName
            let stTime = createEvent.stTime.toLocaleString()
            let eventId = createEvent.eventId
            let url = "/schedule/showEvent/" + eventId
            if (userId != undefined) {
                axios.post("http://localhost:8000/notification/addnotiobject", {
                    template: "SCHEDULE_EVENT",
                    value: [eventName, stTime],
                    userId: [userId],
                    module: "SCHEDULE",
                    url: url,
                    sender: userId,
                })
            }
        }

        res.send(createEvent)
    } catch (err) {
        console.log(err)

        res.status(500).send(err)
    }
}

export default createEvent
