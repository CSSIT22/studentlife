import { Request, Response } from "express"

const getExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const exp = await prisma.eXP.findFirstOrThrow({ where: { userId }, select: { currentXP: true } })
        res.end(exp.currentXP)
    } catch (err) {
        res.status(400).send("Error To Get Your Exp")
    }
}

export default getExp
