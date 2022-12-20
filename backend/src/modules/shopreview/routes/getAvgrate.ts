import { Request, Response } from "express"

const getAvgRate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const avg_rate = await prisma.sReview_Shop.findMany({})
        res.send(avg_rate)
    } catch {
        res.status(400).send("Error can't count rate")
    }
}

export default getAvgRate
