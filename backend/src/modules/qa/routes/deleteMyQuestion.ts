import { Request, Response } from "express"

const deleteMyQuestion = async (req: Request, res: Response) => {
    try {
        const { prisma } = res

        const deleteMyQuestion = await prisma.question.delete({
            where: { qId: req.params.qid }
        })

        res.json(req.params.qid)
    } catch(err) {
        console.log(err)
    }
}

export default deleteMyQuestion