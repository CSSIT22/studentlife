import { Request, Response } from "express"

const searchPost = async (req: Request, res: Response) => {
    const prisma = res.prisma

    try {
        const post = await prisma.student_Post.findFirstOrThrow({ where: { postId: req.params.postId }, include: { postOwner: true, files: true } })
        return res.send(post)
    } catch (error) {
        return res.status(404).send("Post not found")
    }
}

export default searchPost
