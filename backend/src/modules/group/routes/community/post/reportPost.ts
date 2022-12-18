import { Request, Response } from "express"

const reportPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id

    try {
    } catch (err) {}
}

export default reportPost
