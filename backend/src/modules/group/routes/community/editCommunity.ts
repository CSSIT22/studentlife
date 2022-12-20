import { Request, Response } from "express"

const editCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const id = req.params.id



    let selectedTag = body.communityTags?.split(',')
    
    let pic:any = req.files
    
    let privacy = body.communityPrivacy == 'false' ? false : true

    const tag2id = await prisma.tag.findMany({
        select: {
            tagId: true,
        },
        where: {
            tagName: {
                in: selectedTag,
            },
        },
    })


    let a: any = []

    let x: any = {
        any: tag2id.map((item:any) => a.push({ communityId: id,tagId: item.tagId })),//req.params.communityId
    }


    const editCommunity: any = {
        communityName: body.communityName,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy == "false" ? false : true,
        communityPhoto: pic[0]?.buffer,
        
    }



    try {
        await prisma.community.update({
            where: {
                communityId: id,
                
            },
            data: editCommunity,
        })

        await prisma.community_Tag.deleteMany({
            where: {
                communityId: id,
            },
        })

        await prisma.community_Tag.createMany({
            data: a,
        })

        
        res.status(201).send("Edit Success")
    } catch (err) {
        
        res.status(404)
    }
}

export default editCommunity
