//create post
import { Request, Response } from "express"
const createPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id

    try {
        // console.log(body.communityID)
        const post = await prisma.student_Post.create({
            data: {
                userId: userId || "",
                body: body.postText,
            },
        })
        await prisma.community_Post.create({
            data: {
                communityId: body.communityID,
                isPinned: false,
                postId: post.postId,
            },
        })
        console.log(userId)
        res.status(201).send("Created Success")
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}
export default createPost
