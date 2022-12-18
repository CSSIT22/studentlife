import { Request, Response } from "express"
import getPostList from "./getPostList"

const getReacted = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const getReact = await prisma.student_Reacted.findMany({
            // include: {
            //     _count: {
            //         select: {
            //             postId: true,
            //         },
            //     },
            // },
        })
        res.send(getReact)
    } catch (error) {
        res.status(400).send("Error: can not get reaction")
    }
}

export default getReacted
