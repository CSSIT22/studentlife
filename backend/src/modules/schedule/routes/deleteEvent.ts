import { Request, Response } from "express";

const deleteEvent = async (req: Request, res:Response) => {
    const prisma = res.prisma

    try{
        await prisma.event.delete({
            where:{
                eventId: req.body.eventId,
            },
        })

        res.status(200).send("Delete Event Success")
    }catch (err){
        res.status(404).send("Failed to delete event")
    }
}

export default deleteEvent