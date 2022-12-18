import { Request, Response } from "express"
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
            const addHours = (date: Date): Date => {
                const result = new Date(date);
                result.setHours(result.getHours() + 7);
                return result;
              };
            const insertToDelete = await prisma.announcement_Delete.create({
                data: {
                    postId: postId,
                    deleteAt: addHours(deleteAt),
                },
            })
        } else if (status == "Deleted") {
            const deleteonAnnouncement_post = await prisma.announcement.delete({
                where: {
                    postId: postId,
                },
            })
        }
        res.status(200).send("Edit status on HISTORY success")
    } catch (err) {
        res.status(400).send(err)
    }
}
export default editstatusOnHistory
