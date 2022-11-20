import { Request, Response } from "express"

const deleteFile = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const fileId = req.body.fileId
    
    try{
        await prisma.community_File.delete({
            where:{
                fileId:fileId
            }
        })
        res.status(200).send("Delete Success")

    }
    catch(err){
        res.status(404)
    }
}

export default deleteFile