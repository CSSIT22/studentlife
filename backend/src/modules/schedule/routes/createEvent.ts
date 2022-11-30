import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"

const createEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId
    const body = req.body

    // Event is the table from db

    const createEvent = await prisma.event.create({
        data: {
            eventId: body.eventId,
            eventName: body.eventName,
            stTime: new Date("2022-01-01 " + body.startTime),
            endTime: new Date("2022-01-01 " + body.endTime),
            desc: body.eventDesc,
            eventTypeId: body.eventType,
            descId: body.descId,
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
        },
    })

    // const createEvent: any = {
    //     eventId: body.eventId,
    //     eventName: body.eventName,
    //     startTime: body.startTime,
    //     endTime: body.endTime,
    //     // startDate: body.startDate,
    //     // endDate: body.endDate,
    //     eventDesc: body.eventDesc,
    //     eventType: body.eventType,
    // }

    res.send(createEvent)
}

export default createEvent
