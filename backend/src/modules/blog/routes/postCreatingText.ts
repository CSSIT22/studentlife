import { Request, Response } from "express"

const postCreatingText = async (req: Request<any>, res: Response<any>) => {
    const prisma = res.prisma
    const body = req.body
    const user = await prisma.post_Body.create({
        data: {
            text: body.text,
            postId: body.postId,
        },
    })
    res.send(user)
}

export default postCreatingText
