import { Request, Response } from "express"

const deleteCommunityMember = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const target = req.body.userId

    try{
        await prisma.community_User.delete({
            where:{
                
            }
        })

        res.status(200).send("Delete Success")
    }
    catch(err){
        res.status(404)
    }
}



export default deleteCommunityMember