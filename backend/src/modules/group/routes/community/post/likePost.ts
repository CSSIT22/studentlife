import { Request, Response } from "express"

const likePost = async (req: Request, res: Response) => {
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
                        score: {
                            increment: 1,
                        },
                        seen: true,
                    },
                },
            },
        })
        res.status(200).send("Like post success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default likePost
