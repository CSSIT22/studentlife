import { User_Profile } from "@prisma/client"
import { Request, Response } from "express"

export const getPostList = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        // const userId = req.user?.userId || "user id not found"
        const getPost = await prisma.user_Profile.findMany({
            // where: {
            //     userFollowing: {
            //         every: { userId: userId },
            //     },
            // },

            // get list of post that this userId had made
            // select: { postId: true, userId: true, lastEdit: true, score: true, seen: true, body: true },

            // orderBy: {
            //     fName: "desc",
            // },

            include: {
                // userFollowing: {
                //     orderBy: {
                //         score: "desc",
                //     },
                // },
                posts: {
                    orderBy: { score: "desc" },
                    where: { seen: false },
                },
            },
            // take: 20,
        })

        res.send(getPost)
    } catch (error) {
        res.status(400).send("Error: can not get post")
    }
}

export default getPostList
