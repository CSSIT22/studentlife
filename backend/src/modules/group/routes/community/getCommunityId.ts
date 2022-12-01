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
            },
        })

        const tag = await prisma.tag.findMany({
            where: {
                tagId: { in: communityById?.tags.map((item: any) => item.tagId) },
            },
        })

        const community = {
            communityById,
            tag,
        }
        console.log(community)
        res.send(community)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default getCommunityId
