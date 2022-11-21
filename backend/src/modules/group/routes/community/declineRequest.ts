import { Request, Response } from "express"

const declineRequest = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const target = req.body.communityID

    try{
        await prisma.community_User.delete({
            where:{
                userId_communityId:{
                    userId:req.body.userId,
                    communityId:req.body.communityId
                }
            }
        })

        res.status(200).send("Request has been decline")
    }
    catch(err){
        res.status(403)
    }
}


export default declineRequest