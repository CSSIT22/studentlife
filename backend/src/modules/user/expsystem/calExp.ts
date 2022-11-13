import { Request, Response } from "express"

const calExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId
    } catch (err) {
        res.status(500).send("Not found Formula")
    }
}

export default calExp
