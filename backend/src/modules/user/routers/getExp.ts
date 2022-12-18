import { Request, Response } from "express"

const getExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        const checkexp = await prisma.eXP.findFirst({ where: { userId } })
        if (checkexp === null) {
            await prisma.eXP.create({
                data: {
                    currentXP: 0,
                    level: 1,
                    userId: userId,
                },
            })
        }

        const result = await prisma.eXP.findFirstOrThrow({ where: { userId }, select: { currentXP: true, level: true } })
        res.json({
            exp: result.currentXP,
            level: result.level,
        })
    } catch (err) {
        res.status(400).send("Error To Get Your CurrentExp")
    }
}

export default getExp
