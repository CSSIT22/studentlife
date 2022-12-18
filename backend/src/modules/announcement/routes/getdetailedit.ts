import { Request, Response } from "express"

const getDetailEdit = async (req: Request, res: Response) => {
    const id = req.params.id
    const prisma = res.prisma

    try {
        const getdetail = await prisma.announcement.findMany({
            where: {
                postId: id,
            },
            select: {
                postId: true,
                annFilter: {
                    select: {
                        filterType: true,
                        value: true,
                    },
                },
                annLanguage: {
                    orderBy: {
                        languageId: "asc",
                    },
                    select: {
                        postId: true,
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
                annExpired: true,
            },
        })
        res.send(getdetail)
    } catch (err) {
        res.status(404).send("Detail's post not found")
    }
}
export default getDetailEdit
