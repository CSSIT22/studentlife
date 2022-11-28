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
                tagName: {
                    in: body.communityTag,
                },
            },
        })

        let b: any = []

        let y: any = {
            any: tag2id.map((item) => b.push(item.tagId)),
        }

        let a: any = []

        let x: any = {
            any: tag2id.map((item) => a.push({ tagid: item.tagId, communityId: body.communityId })),
        }

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

        

        res.status(201).send(a)
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}

export default communityTest


