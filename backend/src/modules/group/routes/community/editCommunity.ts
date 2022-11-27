import { Request, Response } from "express"

const editCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    const editCommunity: any = {
        communityName: body.communityName,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy,
        communityPhoto: body.communityCoverPhoto,
    }

    try {
        await prisma.community.update({
            where: {
                communityId: body.communityId,
            },
            data: editCommunity,
        })
    } catch {
        res.status(404)
    }
}

export default editCommunity
