import { Request, Response } from "express"

const deleteExpiredPost = async (req: Request, res: Response) => {
    const postId = req.body.postId
    const prisma = res.prisma
    try {
        const deletePost = await prisma.announcement.delete({
            where: {
                postId: postId,
            },
        })
    } catch (err) {
        res.status(400).send(err)
    }
}
export default deleteExpiredPost
