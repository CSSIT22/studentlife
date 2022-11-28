import { Request, Response } from "express"

const postCreatingText = async (req: Request<any>, res: Response<any>) => {
    const prisma = res.prisma
    const body = req.body
    const user = await prisma.student_Post.create({
        data: {
            userId: req.body.userId,
            score: req.body.score,
            seen: req.body.seen,
        },
    })
    res.send(user)
}

export default postCreatingText
