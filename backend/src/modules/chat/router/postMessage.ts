import { Request, Response } from "express";
import { message } from "../../../../mongoose/message";

const postMessage = async(req : Request,res : Response)=>{
    const user = req.user?.userId
    const room_id = req.params.id
    const type = req.body.type
    const msg = req.body.message
    try {
        await message.create({roomId:room_id,senderId:user,messageType:type,message:msg})
        res.send("post message sucessfull")
    } catch (error) {
        res.send(error).status(200)
    }
}
export default postMessage