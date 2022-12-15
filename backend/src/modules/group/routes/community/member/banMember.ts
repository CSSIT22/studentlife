import { Request, Response } from "express"

const banMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = {
        userId: req.body.user,
        communityId: req.body.communityId,
    }

    try {
        const Blist = await prisma.community_Blacklist.create({
            data: user,
        })

        res.status(200).send("Ban Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default banMember
