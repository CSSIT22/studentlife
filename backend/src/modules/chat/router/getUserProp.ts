import { Request, Response } from "express";

const getUserProp = async(req : Request,res : Response)=>{
    const id = req.params.id
    const prisma = res.prisma
    try {
        const user = await prisma.user_Profile.findUniqueOrThrow({
            select:{
                image:true,fName:true
            },where:{
                userId : id
            }
        })
        res.send(user)
    } catch (error) {
        res.status(200).send("s")
    }
}
export default getUserProp