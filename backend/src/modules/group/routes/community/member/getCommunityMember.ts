import { Request, Response } from "express"

const getCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    try {
        const communityAdmin = await prisma.community_User.findMany({
            select: {
                userId: true,
            },
            where: {
                communityId: body.communityId,
                roleId:"clavjra540000v32wccz4v12g"
            },
        })

        const communityCoAdmin = await prisma.community_User.findMany({
            select: {
                userId: true,
            },
            where: {
                communityId: body.communityId,
                roleId:"clavjrudj0002v32welorer2g"
            },
        })

        const communityMember = await prisma.community_User.findMany({
            select: {
                userId: true,
            },
            where: {
                communityId: body.communityId,
                roleId:"clavjs04i0004v32wxmjn3kvk"
            },
        })

        const communityBlacklist = await prisma.community_Blacklist.findMany({
            select: {
                userId: true,
            },
            where: {
                communityId: body.communityId,
            },
        })

        const communityMembers = [
            communityAdmin,
            communityCoAdmin,
            communityMember
        ]

        res.status(200).json(communityMember)
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default getCommunityMember
