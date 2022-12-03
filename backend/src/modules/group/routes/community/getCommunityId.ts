import { Request, Response } from "express"

const getCommunityId = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id

    try {

    

        const communityById = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            include: {
                tags: true,
                member:true
            },
        })

        

        const tag = await prisma.tag.findMany({
            where: {
                tagId: { in: communityById?.tags.map((item: any) => item.tagId) },
            },
        })



        const member = await prisma.community_User.findMany({
            where:{
                userId : userId,
                communityId: id
            }
        })
        const isMember = (member.length == 0) ?  false : true



        const owner = await prisma.community.findMany({
            where:{
                communityOwnerId : userId,
                communityId: id
            }
        })
        const isOwner = (owner.length == 0) ?  false : true


        
        const community = {
            communityById,
            tag,
            isMember,
            isOwner
        }
        
        res.send(community)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default getCommunityId
