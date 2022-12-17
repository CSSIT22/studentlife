import { Request, Response } from "express"

export const getPostList = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || "user id not found"
        const getPost = await prisma.user_Profile.findMany({
            // where: { userId }, // get list of post that this userId had made
            // select: { postId: true, userId: true, lastEdit: true, score: true, seen: true, body: true },
            include: {
                posts: true,
            },
        })

        res.send(getPost)
    } catch (error) {
        res.status(400).send("Error: can not get post")
    }
}

export default getPostList
