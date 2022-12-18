import { Request, Response } from "express";

const leaveGroup = async(req: Request,res : Response)=>{
    const user = req.user
    const group_id = req.params.id
    const prisma = res.prisma
    try {
        if(user === undefined){
            res.status(401).send("Unauthorlized")
        }
        await prisma.user_To_Room.delete({
            where:{
                userId_roomId:{
                    roomId:group_id,
                    userId:`${user?.userId}`
                }
            }
        })
        res.send(`leave group sucessfull`)
    } catch (error) {
        res.status(200).send(error)
    }
}
export default leaveGroup