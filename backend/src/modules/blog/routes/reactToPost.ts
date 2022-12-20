import { Request, Response } from "express"
import { Children } from "react"

const reactToPost = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const body = req.body

        const duplciatedCheck = await prisma.student_Reacted.findFirst({
            where: {
                postId: req.body.postId,
                userId: req.user?.userId || "",
            },
        })

        console.log(duplciatedCheck?.emoteId + " to " + req.body.emoteId.children)

        if (!duplciatedCheck) {
            const react = await prisma.student_Reacted.create({
                data: {
                    postId: req.body.postId,
                    emoteId: req.body.emoteId.children,
                    userId: req.user?.userId || "",
                },
            })

            return res.json("Duplicated found! Successfully deleted")
        } else if (duplciatedCheck?.emoteId != req.body.emoteId.children) {
            const deleteDulpppp = await prisma.student_Reacted.delete({
                where: {
                    userId_postId: {
                        postId: req.body.postId,
                        userId: req.user?.userId || "",
                    },
                },
            })
            const react = await prisma.student_Reacted.create({
                data: {
                    postId: req.body.postId,
                    emoteId: req.body.emoteId.children,
                    userId: req.user?.userId || "",
                },
            })
        } else {
            const deleteDulp = await prisma.student_Reacted.delete({
                where: {
                    userId_postId: {
                        postId: req.body.postId,
                        userId: req.user?.userId || "",
                    },
                },
            })
        }
        res.json("Successfully reacted")
    } catch (err) {
        console.log(err)
    }
}

export default reactToPost
