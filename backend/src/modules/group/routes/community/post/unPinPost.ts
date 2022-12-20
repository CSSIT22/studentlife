import { Request, Response } from "express"

const pinPost = async (req: Request, res: Response) => {
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
                isPinned: false,
            },
        })
        res.send(req.body)
        res.status(200).send("Unpin post success")
    } catch (err) {
        
        res.status(404)
    }
}

export default pinPost
