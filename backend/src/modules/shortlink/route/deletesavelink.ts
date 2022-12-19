import { Request, Response } from "express"

const deletesavelink = async (req:Request,res:Response)=>{
    try{
        await res.prisma.shortLink_Save.delete({
            where:{slId:req.body.slId}
        })
        return res.send(true)
    }
    catch(err){
        console.log(err);
        
        return res.status(400).send(err)
    }
}

export default deletesavelink