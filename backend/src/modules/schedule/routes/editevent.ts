import { Request, Response } from "express"
import { Event, events, getEvent, setEvent } from ".."

const editevent = (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    let editedEvent: Event | null = null
    const newdata = getEvent().map((event) => {
        if (event.id == id) {
            editedEvent = { id: id, name: name }
            return { id: id, name: name }
        }
        return event
    })
    setEvent(newdata)
    res.send("Edit event" + editedEvent)
}

export default editevent
