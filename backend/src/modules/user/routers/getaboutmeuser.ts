import { Request, Response } from "express"

const getaboutmeuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId
        const detail = await prisma.detail.findFirstOrThrow({
            where: { userId },
            select: { phone: true, birth: true, sex: true, hobby: true, year: true },
        })
        res.json(detail)
    } catch (err) {
        res.status(400).send("Error find Aboutme")
    }
}

export default getaboutmeuser
