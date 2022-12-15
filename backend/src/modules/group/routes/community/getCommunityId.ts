import { Request, Response } from "express"

const getCommunityId = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id

    try {
        //     const communityById = await prisma.community.findUnique({
        //         where: {
        //             communityId: id,
        //         },
        //         include: {
        //             tags: true,
        //         },
        //     })
        //     const tag = await prisma.tag.findMany({
        //         where: {
        //             tagId: { in: communityById?.tags.map((item: any) => item.tagId) },
        //         },
        //     })
        //     const community = {
        //         communityById,
        //         tag,
        //     }
        //     console.log(community)
        //     res.send(community)
        const isBlacklist = await prisma.community_Blacklist.findMany({
            where: {
                userId: userId,
                communityId: id,
            },
        })
        const communityById = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            include: {
                tags: true,
                member: true,
                owner: true,
                posts: true,
            },
        })
        const tag = await prisma.tag.findMany({
            where: {
                tagId: { in: communityById?.tags.map((item: any) => item.tagId) },
            },
        })
        if (communityById?.communityId === id) {
            const data = {
                communityId: communityById?.communityId,
                communityName: communityById?.communityName,
                communityDesc: communityById?.communityDesc,
                communityPrivacy: communityById?.communityPrivacy,
                communityPhoto: communityById?.communityPhoto,
                tags: tag,
                isOwner: communityById?.communityOwnerId === userId,
                isPending: communityById?.member.some((item: any) => item.userId === userId && item.status === false),
                isMember:
                    communityById?.communityOwnerId === userId ||
                    communityById?.member.some((item: any) => item.userId === userId && item.status === true),
                memberCount: communityById?.member.length,
                isBlacklist: isBlacklist.length > 0,
            }
            // res.send(data)
            res.send(data)
            res.sendStatus(200)
            // console.log(data)
            // console.log(isUserPending)
        } else {
            res.sendStatus(400)
        }
        // console.log(tag)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default getCommunityId

