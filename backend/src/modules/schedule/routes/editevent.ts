import axios from "axios"
import { Request, Response } from "express"
// import getNewEvent from "./getNewEvent"
// import { getEvent, setEvent, Event, events } from "../index"

const editEvent = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const editEvent: any = {
        eventName: req.body.eventName,
        stTime: new Date(new Date(req.body.stTime).getTime() - 7 * 60 * 60 * 1000),
        endTime: new Date(new Date(req.body.endTime).getTime() - 7 * 60 * 60 * 1000),
        desc: req.body.desc,
        eventTypeId: req.body.eventTypeId,
        place: req.body.place,
    }

    // if (!req.body.eventId) {
    //     return res.status(400).send("Invaid")
    // }

    try {
        await prisma.event.update({
            where: {
                eventId: req.body.eventId,
            },
            data: {
                eventName: req.body.eventName,
                stTime: new Date(new Date(req.body.stTime).getTime() - 7 * 60 * 60 * 1000),
                endTime: new Date(new Date(req.body.endTime).getTime() - 7 * 60 * 60 * 1000),
                desc: req.body.desc,
                eventTypeId: req.body.eventTypeId,
                place: req.body.place,
            },
        })
        const isNoti = req.body.isNoti
        if (editEvent && isNoti) {
            let eventName = req.body.eventName 
            let stTime = new Date(new Date(req.body.stTime).getTime() - 7 * 60 * 60 * 1000).toLocaleString()
            let eventId = req.body.eventId
            let url = "/schedule/showEvent/" + eventId
            if (userid != undefined) {
                axios.post("http://localhost:8000/notification/addnotiobject", {
                    template: "SCHEDULE_EVENT",
                    value: [eventName, stTime],
                    userId: [userid],
                    module: "SCHEDULE",
                    url: url,
                    sender: userid,
                })
            }
        }
        return res.send(editEvent)
    } catch (err) {
        console.log(err)
        res.status(404).send("Error")
    }
}

export default editEvent
