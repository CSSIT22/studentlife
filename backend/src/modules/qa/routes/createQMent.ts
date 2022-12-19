import { Request, Response } from "express"

const createQMent = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const qid = req.params.qid

        const currentDate = new Date()
        const newQMent = await prisma.question_Comment.create({
            data: {
                qId: qid,
                userId: req.user?.userId || "",
                comment: req.body.qment,
                created: currentDate,
                lastUpdated: currentDate
            }
        })

        res.json(req.params.qid)
    } catch(err) {
        console.log(req.body.qment)
        console.log(err)
    }
}

export default createQMent