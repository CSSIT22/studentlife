import { Request, Response } from "express"
import calExp from "../expsystem/calexp"

const getExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""

        const exp = await prisma.eXP.findFirstOrThrow({ where: { userId }, select: { currentXP: true } })
        res.json({
            exp: exp.currentXP,
        })
    } catch (err) {
        res.status(400).send("Error To Get Your CurrentExp")
    }
}

export default getExp
// calExp(res.prisma, userId)
