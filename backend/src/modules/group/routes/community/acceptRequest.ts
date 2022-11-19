import { Request, Response } from "express"

const acceptRequest = async(req: Request, res: Response) =>{
        
    const prisma = res.prisma
    const body = req.body


    const invite : any = {
        userId:req.body.userId,
        communityId:req.body.communityId,
        status: true
    }
    
    try{
        await prisma.community_User.update({  
            where:{
                //userId: body.userId
                //communityId: body.communityId,
            },
            data:invite
        })
        res.status(200).send("Request has been accept")
    }
    catch{
        res.status(403)
    }
}




export default acceptRequest