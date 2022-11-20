import { Request, Response } from "express"

const deleteCommunity = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const target = req.body.communityID

    try{

        await prisma.community.delete({
            where:{
                communityId:target,
            }
        })

        res.status(200).send("Delete Success")
    }
    catch(err){
        res.status(404)
    }
}



export default deleteCommunity