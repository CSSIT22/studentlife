import {Request , Response } from "express"
const savelink = async(req : Request , res : Response)=>{
    const body = req.body
    const userId = req.user?.userId || ""
    console.log(req.body.originalLink)
    console.log(req.body.shortenLink)
    try{
        const prisma = res.prisma

        const result = await res.prisma.shortLink_Save.findMany
        // const result = await prisma.shortLink.create({
        //     data:{
        //         userId:userId,
        //         originalLink:body.originalLink,
        //         shortenLink:body.shortenLink
        //     },
        // })
        // console.log(result)
        // res.status(200).json({result:result})
    }catch (err){
        console.log(err)
        res.status(500).json({message:"error" , err: err})
    }
}   
export default savelink