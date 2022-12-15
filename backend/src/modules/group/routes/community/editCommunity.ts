import { Request, Response } from "express"

const editCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const id = req.params.id

    const editCommunity: any = {
        communityName: body.communityName,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy,
        communityPhoto: body.communityCoverPhoto,
    }

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

    let a: any = []

    let x: any = {
        any: tag2id.map((item) => a.push({ tagId: item.tagId, communityId: body.communityId })), //req.params.communityId
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
        console.log(err)
        res.status(404)
    }
}

export default editCommunity
