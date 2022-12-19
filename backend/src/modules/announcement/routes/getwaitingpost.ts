import { Request, Response } from "express"

const getWaitingPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const waitingpost = await prisma.announcement.findMany({
            where: {
                annPost: {
                    status: "Waiting for Approve",
                },
            },
            select: {
                postId: true,
                userId: true,
                annCreator: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
                annLanguage: {
                    where: {
                        languageId: 1000,
                    },
                    select: {
                        annTopic: true,
                    },
                },
            },
        })
       
        res.status(200).send(waitingpost)
    } catch (err) {
        res.status(400).send("Error find waitingpost")
    }
}

export default getWaitingPost
