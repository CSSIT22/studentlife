import { Request, Response } from "express"

const unBanMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = {
        userId: req.body.user,
        communityId: req.body.communityId,
    }

    try {
        // res.send(req.body.userId)
        await prisma.community_Blacklist.delete({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
        })
        await prisma.community_User.create({
            data: {
                userId: req.body.userId,
                communityId: req.body.communityId,
                roleId: "clavjs04i0004v32wxmjn3kvk",
                joined: new Date(),
                status: true,
            },
        })
        // await prisma.community_User.delete({
        //     where: {
        //         userId_communityId: {
        //             userId: req.body.userId,
        //             communityId: req.body.communityId,
        //         },
        //     },
        // })
        res.status(200).send("Unban Success")
    } catch (err) {
        
        res.status(404)
    }
}

export default unBanMember
