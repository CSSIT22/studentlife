import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"

const createEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId
    const body = req.body

    // Event is the table from db

    // const createEvent = await prisma.event.create({
    //     eventId: body.eventId,
    //     eventName: body.eventName,
    //     startTime: body.startTime,
    //     endTime: body.endTime,
    //     startDate: body.startDate,
    //     endDate: body.endDate,
    //     eventDesc: body.eventDesc,
    //     eventType: body.eventType,
    // })

    const createEvent: any = {
        eventId: body.eventId,
        eventName: body.eventName,
        startTime: body.startTime,
        endTime: body.endTime,
        startDate: body.startDate,
        endDate: body.endDate,
        eventDesc: body.eventDesc,
        eventType: body.eventType,
    }
}

export default createEvent
