import { Request, Response } from "express"

const leaveCommuntiy = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId

    try {
        await prisma.community_User.delete({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
        })

        res.status(200).send("Leave Success")
    } catch (err) {
        res.status(403)
    }
}

export default leaveCommuntiy
