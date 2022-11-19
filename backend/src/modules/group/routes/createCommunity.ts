import { Request, Response } from "express"
import { createCommunity } from "../../../../../types/group"


const createCommunity = async (req: Request, res: Response) =>{
        
        const prisma = res.prisma
        const body = req.body
        const userid = req.user?.userId
        
        const createCommunity : any = {   
            communityName : body.communityName,
            communityOwnerId : body.user,
            communityDesc : body.communityDesc,
            communityPrivacy : body.communityPrivacy,
            communityPhoto : body.communityCoverPhoto
        }

        try{
        await prisma.community.create(   
            {
                data: createCommunity
            }
        )

        res.status(201).send("Created Success")
        }

        catch(err){
            res.status(403)
        }
        
    }





export default createCommunity