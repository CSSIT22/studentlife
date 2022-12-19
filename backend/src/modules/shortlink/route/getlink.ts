import { Request , Response } from "express";
const getlinkData = async (req:Request , res: Response) =>{
    try {
        const{ prisma } = res
        const savelink = await prisma.shortLink.findMany({
            select:{
                slId:true,
                userId:true,
                title:"",
                desc:"",
                link:req.body.title,
            },take:100
        })
        res.status(200).json({link:savelink})
    } catch (error:any) {
        console.log(error)
        res.status(400).json({message:error})   
    }
}
export default getlinkData