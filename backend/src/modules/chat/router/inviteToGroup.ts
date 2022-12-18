import { Request, Response } from "express";

const inviteToGroup = async(req : Request,res : Response)=>{
    const user = req.user?.userId
    const pirsma = res.prisma
    const target_id = req.body.target_id
    const room_id = req.params.id
    try {
        await pirsma.user_To_Room.create({
            data:{
                roomId:`${room_id}`,userId:target_id
            }
        })
        res.send("invite sucuessfully")
    } catch (error) {
        res.status(200).send(error)
    }
}
export default inviteToGroup