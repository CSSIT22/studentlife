import { Request, Response } from "express";
import { getEvent, Event } from "..";

const getEditedevent = (req: Request, res: Response) => {
    const id = parseInt(req.params.id + "")
    let selectedevent: Event | null = null
    getEvent().forEach((Event) => {
        //  if(Event.eventId == id){
        // selectedEvent = Event
        // }
    })
    //if(selectedEvent != null){
       //return res.send(selectedEvent) 
    // }
    //return res.send(404).send("Event not found")
}
export default getEditedevent