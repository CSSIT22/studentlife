import { Request, Response } from "express"

const createComment = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const pid = req.params.postId
        const body = req.body
        console.log(pid)

        const currentDate = new Date()
        const newQMent = await prisma.post_Comment.create({
            data: {
                postId: pid,
                userId: req.user?.userId || " ",
                comment: req.body.cMent,
                cmTime: currentDate,
            },
        })

        res.json(req.params.pid)
    } catch (err) {
        console.log(err)
    }
}

export default createComment
