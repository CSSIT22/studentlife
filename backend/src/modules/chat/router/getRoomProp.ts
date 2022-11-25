import { Request, Response } from "express"

const room_prop = async(req : Request,res : Response)=>{
    try{
        const {id} = req.params
    const prisma = res.prisma
    const room_prop = await prisma.chat_Room.findUnique({
        where:{
            roomId : id
        }
    })
    res.send(room_prop)
    }
    catch(err){
        res.status(400).send("Can't find room by id")
    }
}
export default room_prop;