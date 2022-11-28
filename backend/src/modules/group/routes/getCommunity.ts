import { Request, Response } from "express"

const getCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId

    try {
        const communityUser = await prisma.community_User.findMany({

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


        const invitations = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
        })


        const countJoined = joinedCommunitys.length
        const countOwn = ownCommunitys.length
        const countInvite = invitations.length


        const commuinities: any = {
            
            ownCommunitys,
            countOwn,
            joinedCommunitys,
            countJoined,
            invitations,
            countInvite
            
        }

        res.send(commuinities)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunity
