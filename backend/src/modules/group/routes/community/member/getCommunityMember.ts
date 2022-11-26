import { Request, Response } from "express"

const getCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    try {
        const communityMember = await prisma.community_User.findMany({
            select: {
                userId: true,
            },
            where: {
                communityId: body.communityId,
            },
        })

        res.status(200).json(communityMember)
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default getCommunityMember
