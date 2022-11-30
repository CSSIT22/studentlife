import { Request, Response } from "express"

const communityTest = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    try {
        const tag2id = await prisma.tag.findMany({
            select: {
                tagId: true,
            },
            where: {
                tagId: {
                    in: body.communityTag,
                },
            },
        })

        let isSelect = false

        let haha = {tag2id,isSelect}

        let b: any = []

        let y: any = {
            any: tag2id.map((item) => b.push(item.tagId)),
        }

        let a: any = []

        let x: any = {
            any: tag2id.map((item) => a.push({ tagid: item.tagId, communityId: body.communityId })),
        }


        const communityUser = await prisma.community_User.findMany({
            where: {
                userId: body.user,
                status: true,
            },
        })

        const suggestions = await prisma.community.findMany({
            where: {
                communityId: { notIn: communityUser.map((item: any) => item.communityId) },
                NOT:{communityOwnerId: body.user}
            },
        })


        const newTag = await prisma.community_Tag.findMany({
            where:{
                tagId: { notIn: a.map((item: any) => item.tagId) },
            }
        })

        const test = await prisma.restaurant.findMany({
            select:{
                resName:true,
                images:true,
                
            },
            where:{}
        })

        res.send(suggestions)
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}

export default communityTest


