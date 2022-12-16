import { Role_Type } from "@prisma/client"
import { Request, Response } from "express"

const pendingRequest = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    try {
        const pendingRequest: any = {
            userId: body.user,
            communityId: body.communityId, //req.params.communityId
            roleId: "clavjs04i0004v32wxmjn3kvk",
            joined: new Date(),
            status: false,
        }
        const pending = await prisma.community_User.create({
            data: pendingRequest,
        })

        res.status(201).send("Request has been send")
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default pendingRequest
//for private community
