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
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })

        const ownCommunitys = await prisma.community.findMany({
            where: {
                communityOwnerId: userId,
            },
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })
        
        
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

