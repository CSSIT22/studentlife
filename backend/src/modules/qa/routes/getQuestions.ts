import { Request, Response } from "express"
// import { GetQuestions } from "@apiType/qa";

const getQuestions = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const questions = await prisma.question.findMany({
            select: { qId: true, userId: true, created: true, lastUpdated: true, qTitle: true, qDesc: true, voteCount: true },
            take: 20,
            orderBy: { voteCount: "desc" },
        })
        return res.json({
            questions,
        })
    } catch (err) {
        res.status(400).send("Failed to retrieve questions")
    }
}

export default getQuestions
