import { Request, Response } from "express"

const getCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId

    try {
        const communityUser = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            // where: {
            //     userId: userid,
            //     status: true
            // },
        })

        const communityUserInvite = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            // where: {
            //     userId: userid,
            //     status: false
            // },
        })


        const commuinityJoin = await prisma.community.findMany({
            where: {
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },
        })


        const communityManage = await prisma.community.findMany({
            where: {
                communityOwnerId: userid,
            },
        })


        const communityInvite = await prisma.community.findMany({
            where: {
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },
        })


        const join = commuinityJoin.length
        const manage = communityManage.length
        const invite = communityInvite.length


        const commuinities: any[] = [
            
            {commuinityJoin,join},

            {communityManage,manage},

            {communityInvite,invite}
            
        ]

        res.status(200).json(commuinities)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunity
