import { Request, Response } from "express"

const deletePost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id

    try {
        await prisma.community_Post.delete({
            where: {
                postId: body.postId,
            },
        })

        res.status(200).send("Delete Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default deletePost
