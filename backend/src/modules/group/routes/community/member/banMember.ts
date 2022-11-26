import { Request, Response } from "express"

const banMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = {
        userId: req.body.userId,
        communityId: req.body.communityId,
    }

    try {
        const dMember = await prisma.community_User.delete({
            where: {
                userId_communityId: user
            },
        })

        const aBlist = await prisma.community_Blacklist.create({
            data:user
        })

        res.status(200).send("Delete Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default banMember
