import { Request, Response } from "express"

const banMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = {
        userId: req.body.userId,
        communityId: req.body.communityId,
    }

    try {
        // await prisma.community_Blacklist.delete({
        //     where: {
        //         userId_communityId: {
        //             userId: req.body.userId,
        //             communityId: req.body.communityId,
        //         },
        //     },
        // })
        await prisma.community_Blacklist.create({
            data: {
                userId: req.body.userId,
                communityId: req.body.communityId,
                since: new Date(),
            },
        })
        await prisma.community_User.delete({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
        })

        // await prisma.community_User.delete({
        //     where: {
        //         userId_communityId: {
        //             communityId: req.body.communityId,
        //             userId: req.body.userId,
        //         },
        //     },
        // })

        // const Blist = await prisma.community_Blacklist.create({
        //     data: user,
        // })

        res.status(200).send("Ban Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default banMember
