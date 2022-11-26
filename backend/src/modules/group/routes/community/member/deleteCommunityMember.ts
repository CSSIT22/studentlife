import { Request, Response } from "express"

const deleteCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma

    try {
        await prisma.community_User.delete({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
        })

        res.status(200).send("Delete Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default deleteCommunityMember
