import { post } from "@apiType/announcement"
import { Request, Response } from "express"

const editPinStatus = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const pinStatus = req.body.pinStatus
    const prisma = res.prisma

    try {
        const updatepin = await prisma.announcement_Pin.updateMany({
            where: {
                userId: req.user?.userId,
                postId: postId,
            },
            data: {
                status: pinStatus,
            },
        })
        res.status(200).send("Update pin status success")
    } catch (err: any) {
        res.status(400).send(err)
    }
}
export default editPinStatus
