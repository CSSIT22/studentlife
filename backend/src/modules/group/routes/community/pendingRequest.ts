import { Request, Response } from "express"


const pendingRequest = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId

    const pendingRequest: any = {
        userId: userid,
        //roleId: body.roleId,  || default is user
        communityId: req.body.communityId,
        status: false
    }

    try {
        await prisma.community_User.create({
            data: pendingRequest,
        })

        res.status(201).send("Request has been send")
    } catch (err) {
        res.status(400)
    }
}

export default pendingRequest
//for private community