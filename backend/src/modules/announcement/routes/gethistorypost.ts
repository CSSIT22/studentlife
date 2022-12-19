import { Request, Response } from "express"

const getHistoryPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const historypage = await prisma.announcement.findMany({
            where: {
                userId: req.user?.userId || "",
            },
            select: {
                postId: true,
                userId: true,
                annLanguage: {
                    orderBy: {
                        languageId: "asc",
                    },
                    select: {
                        languageId: true,
                        annTopic: true,
                        annDetail: true,
                    },
                },
                annPost: {
                    select: {
                        status: true,
                    },
                },
                annCreator: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
            },
        })
        res.send(historypage)
    } catch (err) {
        res.status(404).send("Post on history not found")
    }
}

export default getHistoryPost
