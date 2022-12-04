import { Request, Response } from "express"

const getCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId

    try {
        const communityUser = await prisma.community_User.findMany({
            where: {
                userId: userId,
                status: true,
            },
        })

        const communityUserInvite = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            where: {
                userId: userId,
                status: false,
            },
        })

        const joinedCommunitys = await prisma.community.findMany({
            where: {
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },
        })

        const ownCommunitys = await prisma.community.findMany({
            where: {
                communityOwnerId: userId,
            },
        })
        // const pendingRequest = await prisma.community_User.findMany({
        //     where: {
        //         communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
        //         status: false,
        //     },
        //     include: {
        //         user: true,
        //     },
        // })
        const pendingRequest = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
            include: {
                member: {
                    where: {
                        userId: userId,
                    },
                },
                owner: true,
            },
        })
        // const memberCount = await prisma.community_User.count({
        //     where: {
        //         communityId: { in: communityUser.map((item: any) => item.communityId) },
        //         status: true,
        //     },
        // })
        const invitations = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
        })

        const suggest = await prisma.community.findMany({
            where: {
                communityId: { notIn: communityUser.map((item: any) => item.communityId) },
                NOT: { communityOwnerId: userId },
            },
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })

        // const countJoined = joinedCommunitys.length
        // const countOwn = ownCommunitys.length
        // const countInvite = invitations.length
        const commuinities: any = {
            count: joinedCommunitys.length + ownCommunitys.length, //send count of joined and own community
            userId: userId,
            communityList: {
                joined: joinedCommunitys,
                own: ownCommunitys,
                invite: invitations,
                suggest: suggest,
                pendingRequest: pendingRequest,
            },
            // ownCommunitys,
            // countOwn,
            // joinedCommunitys,
            // countJoined,
            // invitations,
            // countInvite
        }

        res.send(commuinities)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunity
