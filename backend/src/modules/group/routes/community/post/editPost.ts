import { Request, Response } from "express"

const editPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id

    try {
        await prisma.community_Post.update({
            where: {
                postId: body.postId,
            },
            data: {
                post: {
                    update: {
                        body: body.body,
                        lastEdit: new Date(),
                    },
                },
            },
        })
        res.send(req.body)
        res.status(200).send("Edit post success")
    } catch (err) {
        
        res.status(404)
    }
}

export default editPost
