import { Request, Response } from "express";

const editGroupProp = async(req:Request , res:Response)=>{
    const user = req.user?.userId
    const id = req.params.id
    const prisma = res.prisma
    const chatColor = req.query.chatColor
    const roomName = req.query.roomName
    try {
        if(user === undefined){
            res.status(401).send("Unauthenlization")
        }
        if (chatColor != null) {
            await prisma.chat_Room.update({
                where: {
                    roomId: id,
                },
                data: {
                    chatColor: `${chatColor}`,
                },
            })
        }
        if (roomName != null) {
            await prisma.chat_Group.update({
                where:{
                    roomId:id
                },
                data:{
                    roomName:`${roomName}`
                }
            })
        }
        res.send("successfull")
    } catch (error) {
        res.status(200).send(error)
    }
}
export default editGroupProp