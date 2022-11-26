import { Request, Response } from "express"

const room_prop = async(req : Request,res : Response)=>{
    try{
    const user = req.user?.userId
    const room_id = req.params.id
    const prisma = res.prisma
    const room_prop = await prisma.user_To_Room.findFirstOrThrow({
        select:{
            room:true,
            userId:true
            
        },where:{
            userId : user,
            roomId : room_id
        }
    })
    const resiever = await prisma.chat_Individual.findFirstOrThrow({
        select:{
            anotherUserId:true
        },where:{
            roomId : room_prop.room.roomId
        }
    })
    const resiveImg = await prisma.user_Profile.findFirstOrThrow({
        select:{
            image:true,
        },where:{
            userId :resiever.anotherUserId
        }
    })
    res.send({...room_prop,...resiveImg})
    }
    catch(err){
        res.status(400).send("ther is not this room in this user")
    }
}
export default room_prop;