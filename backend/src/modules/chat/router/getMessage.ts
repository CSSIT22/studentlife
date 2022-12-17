import { Request, Response } from "express";
import { message } from "mongoose/message";

const getMessage = async(req : Request,res : Response)=>{
    const user = req.user?.userId
    const room_id = req.params.id
    try {
        const Message = await message.find({
            roomId:room_id
        })
        res.json(Message)
    } catch (error) {
        res.status(200).send(error)
    }
}