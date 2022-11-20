import { Request, Response } from "express"

const getAboutme = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const detail = await prisma.detail.findFirstOrThrow({
            where: { userId },
            select: { phone: true, birth: true, sex: true, hobby: true, year: true },
        })
        res.json(detail)
    } catch (err) {
        res.status(400).send("Error find Aboutme")
    }
}

export default getAboutme
