import { Request, Response } from "express";
import { nanoid } from "nanoid";

const createGroup = async(req:Request, res:Response)=>{
    const user = req.user?.userId
    const room_id = nanoid();
    const roomName = req.query.name
    const prisma = res.prisma
    try {
        if(user === undefined){
            res.status(401).send("Unauthorlized")
        }
        const user_id = await prisma.user_Profile.findUniqueOrThrow({
            select:{
                userId:true
            },where:{
                userId:user
            }
        })
        await prisma.chat_Room.create({
            data:{
                chatColor: "#E68E5C",
                roomType: "GROUP",
                roomId: room_id,
            }
        })
        await prisma.chat_Group.create({
            data:{
                roomId:room_id,
                roomName:`${roomName}`
            }
        })
        await prisma.user_To_Room.create({
            data:{
                userId:user_id.userId,
                roomId : room_id
            }
        })
        res.send("create successFull")
    } catch (error) {
        res.status(200).send(error)
    }
}
export default createGroup