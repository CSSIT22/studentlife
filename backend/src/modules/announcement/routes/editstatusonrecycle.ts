import { Request, Response } from "express"

const editstatusOnRecyclebin = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const prisma = res.prisma
    try {
        const deleteOnDelete = await prisma.announcement_Delete.delete({
            where: {
                postId: postId,
            },
        })
        const addOnAnnouncement_post = await prisma.announcement_Post.create({
            data: {
                postId: postId,
                status: "Approve",
            },
        })
        res.status(200).send("Edit status on RECYCLEBIN success")
    } catch (err) {
        res.status(400).send(err)
    }
}

export default editstatusOnRecyclebin
