import { Request, Response } from "express"
import { createCommunity } from "../../../../group"

const joinCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const joinRequest: any = {
        userId: userid,
        communityId: body.communityId, //req.params.communityId
        roleId: "clavjs04i0004v32wxmjn3kvk",
        joined: new Date(),
        status: true,
    }

    try {
        await prisma.community_User.create({
            data: joinRequest,
        })
        console.log(joinRequest)
        res.status(201).send("Joining Success")
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default joinCommunity
