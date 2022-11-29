import { Request, Response } from "express"

const unBanMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = {
        userId: req.body.user,
        communityId: req.body.communityId,
    }

    try {
        const Blist = await prisma.community_Blacklist.delete({
            where: {
                userId_communityId: user,
            },
        })

        res.status(200).send("Unban Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default unBanMember
