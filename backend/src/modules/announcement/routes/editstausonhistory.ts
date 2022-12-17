import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const editstatusOnHistory = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const status = req.body.status
    const deleteAt = req.body.deleteAt
    const prisma = res.prisma
    try {
        if (status == "Delete") {
            const deleteonAnnouncement_post = await prisma.announcement_Post.delete({
                where: {
                    postId: postId,
                },
            })
            const insertToDelete = await prisma.announcement_Delete.create({
                data: {
                    postId: postId,
                    deleteAt: deleteAt,
                },
            })
            res.send(insertToDelete)
        } else if (status == "Deleted") {
            const deleteonAnnouncement_post = await prisma.announcement.delete({
                where: {
                    postId: postId,
                },
            })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}
export default editstatusOnHistory
