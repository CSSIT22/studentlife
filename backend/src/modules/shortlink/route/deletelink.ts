import { Request, Response } from "express"

const deletelink = async (req:Request,res:Response)=>{
    try{
        await res.prisma.shortLink.delete({
            where:{slId:req.body.slId}
        })
        return res.send(true)
    }
    catch(err){
        console.log(err);
        
        return res.status(400).send(err)
    }
}

export default deletelink