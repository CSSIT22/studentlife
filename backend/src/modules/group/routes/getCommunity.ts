import { Request, Response } from "express"

const getCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.body.user//req.user?.userId

    try {
        const communityUser = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            where: {
                userId: userId,
                status: true
            },
        })

        const communityUserInvite = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            where: {
                userId: userId,
                status: false
            },
        })


        const commuinityJoin = await prisma.community.findMany({
            where: {
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },
        })


        const communityManage = await prisma.community.findMany({
            where: {
                communityOwnerId: userId,
            },
        })


        const communityInvite = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
        })


        const countJoined = joinedCommunitys.length
        const countOwn = ownCommunitys.length
        const countInvite = invitations.length


        const commuinities: any[] = {
            
            ownCommunitys,
            countOwn,
            joinedCommunitys,
            countJoined,
            invitations,
            countInvite
            
        }

        res.status(200).json(commuinities)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunity
