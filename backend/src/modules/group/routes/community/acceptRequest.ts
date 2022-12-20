import { Request, Response } from "express"

const acceptRequest = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    const invite: any = {
        status: true,
    }

    try {
        await prisma.community_User.update({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
            data: {
                status: true,
            },
        })

        console.log("Accept Success")
        res.status(200).send("Request has been accept")
    } catch (err) {
        
        res.status(403)
    }
}

export default acceptRequest
