import { Request, Response } from "express";
import { message } from "mongoose/message";

const postMessage = async(req : Request,res : Response)=>{
    const user = req.user?.userId
    const room_id = req.params.id
    const type = req.body.type
    const msg = req.body.message
    try {
        await message.create({roomId:room_id,senderId:user,messageType:type})
    } catch (error) {
        res.send(error)
    }
}