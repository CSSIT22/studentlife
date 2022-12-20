import {Request , Response } from "express"
import { customAlphabet, nanoid } from "nanoid"

const funcsavelink = async(req : Request , res : Response)=>{
    
    const body = req.body
    const userId = req.user?.userId || ""
    const customNanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6)

    console.log(req.body.title)

    try{
        const prisma = res.prisma

        const result = await prisma.shortLink_Save.create({
            data: {
                slId: nanoid(),
                userId:userId,
                title:"",
                desc:"",
                link:req.body.title,
            },
        })
        console.log(result)
        res.status(200).json({result : result})
    }catch (err){
        console.log(err)
        res.status(500).json({message:"error" , err: err})
    }
}
export default funcsavelink