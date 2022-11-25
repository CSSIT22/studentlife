import { Request, Response } from "express"
import { createCommunity } from "../../../../group"

const joinCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const joinRequest: any = {
        userid: body.user,
        communityId: body.communityId,
        status: true,
    }

    try {
        await prisma.community.create({
            data: joinRequest,
        })

        res.status(201).send("Joining Success")
    } catch (err) {
        res.status(400)
    }
}

export default joinCommunity
