import { Request, Response } from "express"

const getMyQuestions = async (req: Request, res: Response) => {

    try {
        const { prisma } = res
        const questions = await prisma.question.findMany({
            select: {
                qId: true,
                userId: true,
                created: true,
                lastUpdated: true,
                qTitle: true,
                qDesc: true,
                voteCount: true,
                qCreator: { select: { fName: true, lName: true, userId: true } },
                comments: { include: { 
                    commentor: { select: { fName: true, lName: true, userId: true } } 
                }
                },
                answers: {
                    include: {
                        aCreator: { select: { fName: true, lName: true, userId: true } },
                        comments: { include: { commentor: { select: { fName: true, lName: true, userId: true } } } },
                    },
                    orderBy: {
                        created: "asc"
                    }
                },
                tags: {
                    include: {
                        tagIs: true,
                    },
                },
            },
            take: 20,
            where: { userId: req.params.userid },
            orderBy: { voteCount: "desc" },
        })

        return res.json({
            questions,
        })

    } catch (err) {
        console.log(err)
        res.status(400).send("Failed to retrieve my questions")
    }
}

export default getMyQuestions