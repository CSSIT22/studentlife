import { Request, Response } from "express"
import { send } from "process"
import pendingRequest from "../pendingRequest"

const getCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const id = req.params.id
    const userId = req.user?.userId

    try {
        const communityMember = await prisma.community_User.findMany({
            where: {
                communityId: body.communityId,
            },
        })

        res.status(200).json(communityMember)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default getCommunityMember
