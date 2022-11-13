import { Request, Response } from "express"

const getExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId
        const exp = await prisma.eXP.findFirstOrThrow({ where: { userId }, select: { currentXP: true } })
        res.json({
            exp: exp.currentXP,
        })
    } catch (err) {
        res.status(400).send("Error To Get Your Exp")
    }
}

export default getExp
