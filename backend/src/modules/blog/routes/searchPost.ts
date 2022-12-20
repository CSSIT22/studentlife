import { Request, Response } from "express"

const searchPost = async (req: Request, res: Response) => {
    const prisma = res.prisma

    try {
        const post = await prisma.student_Post.findFirstOrThrow({
            where: { postId: req.params.postId },
            include: { postOwner: true, studentsReacted: true, files: true, _count: { select: { studentsReacted: true } } },
        })
        let react = await prisma.student_Reacted.findFirst({
            where: {
                userId: req.user?.userId,
                postId: post.postId,
            },
        })

        if (!react) {
            // react = null
            // or
            react = {
                userId: "",
                postId: "",
                emoteId: "",
            }
        }
        return res.send({ ...post, react })
    } catch (error) {
        return res.status(404).send("Post not found")
    }
}

export default searchPost
