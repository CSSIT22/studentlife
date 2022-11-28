import { Request, Response } from "express";

const deleteEvent = async (req: Request, res:Response) => {
    const prisma = res.prisma

    try{
        await prisma.event.delete({
            where:{
                eventId: req.body.eventId,
            },
        })

        res.status(200).send("Delete Task Success")
    }catch (err){
        res.status(404)
    }
}

export default deleteEvent