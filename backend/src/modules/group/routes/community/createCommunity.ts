import { Request, Response } from "express"
import { createCommunity } from "../../../../group"

const createCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const createCommunity: any = {
        communityName: body.communityName,
        communityOwnerId: userid,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy,
        communityTag: body.CommunityTag,
        communityPhoto: body.communityCoverPhoto,
    }

    const selectTags : any={
        tagName:body.communityTag
    }

    


    try {
        
        const tag = await prisma.tag.findMany({
            select:{
                tagId:true
            },
            where:{
                tagName:{in : selectTags.map((item:any) => item.tagName)}
            }
        })
        
        const tagGenerate:any = await{
            
        } 


        await prisma.community.create({
            data: createCommunity,
        })

        

        

        res.status(201).send("Created Success")
    } catch (err) {
        res.status(403)
    }
}

export default createCommunity
