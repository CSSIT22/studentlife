import { Request , Response } from "express";
const getlinkData = async (req:Request , res: Response) =>{
    try {
        const{ prisma } = res
        const linkData = await prisma.shortLink.findMany({
            select:{
                userId: true,
                originalLink: true,
                shortenLink:true
            },take:100
        })
        res.status(200).json({link:linkData})
    } catch (error:any) {
        console.log(error)
        res.status(400).json({message:error})   
    }
}
export default getlinkData