import { Request, Response } from "express"

const getDeletePost = async (req: Request, res: Response) => {
    const id = req.user?.userId
    const prisma = res.prisma
    try {
        const recyclebin = await prisma.announcement_Delete.findMany({
            where: {
                post: {
                    userId: req.user?.userId || "",
                },
            },
            select: {
                deleteAt: true,
                post: {
                    select: {
                        postId: true,
                        annLanguage: {
                            select: {
                                languageId: true,
                                annTopic: true,
                                annDetail: true,
                            },
                        },
                        annCreator: {
                            select: {
                                fName: true,
                                lName: true,
                            },
                        },
                    },
                },
            },
        })

        res.send(recyclebin)
    } catch (err) {
        res.status(404).send("Post on recycle bin not found")
    }
}
export default getDeletePost
