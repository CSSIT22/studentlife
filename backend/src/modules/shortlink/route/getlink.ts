import { Request , Response } from "express";
const getlinkData = async (req:Request , res: Response) =>{
    try {
        const{ prisma } = res
        const savelink = await prisma.shortLink.findMany({
            select:{
                userId: true,
                originalLink: true,
                shortenLink:true,
                slId:true
            },take:100
        })
        res.status(200).json({link:savelink})
    } catch (error:any) {
        console.log(error)
        res.status(400).json({message:error})   
    }
}
export default getlinkData