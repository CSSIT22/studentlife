import { Request, Response } from "express"

const postCreatingText = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const post = await prisma.student_Post.create({
        data: {
            userId: req.user?.userId || "",
            body: req.body.body,
        },
    })
    return res.send(post)
}

export default postCreatingText
