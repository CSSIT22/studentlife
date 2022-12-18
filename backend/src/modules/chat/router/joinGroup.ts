import { Request, Response } from "express";

const joinGroup = async(req:Request , res:Response)=>{
    const user_id = req.user?.userId
    const group_id = req.body.group_id
    const prisma = res.prisma
    try {
        if(user_id === undefined){
            res.status(401).send("Unthorlized")
        }
        const user = await prisma.user_Profile.findUniqueOrThrow({
            select:{
                fName:true,
                userId:true
            },where:{
                userId:user_id
            }
        })
        await prisma.user_To_Room.create({
            data:{
                roomId:group_id,
                userId:user.userId
            }
        })
        res.send(`${user.fName} join sucessfull`)
    } catch (error) {
        res.status(200).send(error)
    }
}
export default joinGroup