import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"
import { getEvent, setEvent } from ".."

const createEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId
    const body = req.body

    // need to create prisma datasourse "schedule_event"
    // ตอนนี้ยังใช้บ่ได้

    const newEvent = await prisma.schedule_event.create({
        eventId: body.eventId,
        eventName: body.eventName,
        startTime: body.startTime,
        endTime: body.endTime,
        eventDesc: body.eventDesc,
        eventType: body.eventType,
    })
}

export default createEvent
