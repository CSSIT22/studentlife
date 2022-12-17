import { Request, Response } from "express"
// import { Event } from "@apiType/schedule"

const createEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId
    const body = req.body

    // Event is the table from db
    try {
        console.log(body);
        
        const createEvent = await prisma.event.create({
            data: {
                eventName: body.eventName,
                stTime: new Date(body.stTime),
                endTime: new Date(body.endTime),
                desc: body.desc,
                eventTypeId: body.eventTypeId,
                // descId: body.descId,
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
        // await prisma.t
        res.send(createEvent)
    } catch (err) {
        console.log(err)

        res.status(500).send(err)
    }

    
}

export default createEvent
