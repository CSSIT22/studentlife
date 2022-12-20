import { Request, Response } from "express"
import { createCommunity } from "../../../../../types/group"

const createCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    let selectedTag = body.communityTags?.split(",")

    console.log(body.communityTags)
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

    let pic: any = req.files

    let privacy = body.communityPrivacy == "false" ? false : true

    const createCommunity: any = {
        communityName: body.communityName,
        communityOwnerId: userid,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy == "false" ? true : false,
        communityPhoto: pic[0].buffer,
        tags: { create: tag2id },
    }

    try {
        await prisma.community.create({
            data: createCommunity,
        })
        console.log(body)
        res.status(201).send("Created Success")
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}

export default createCommunity
