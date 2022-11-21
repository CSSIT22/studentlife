import { Request, Response } from "express"
import { Event, events, getEvent, setEvent } from ".."

const addevent = (req: Request, res: Response) => {
    const id = req.params.id
    res.send("Hello " + id)
}

export default addevent
