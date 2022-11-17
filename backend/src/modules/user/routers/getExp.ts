import { Request, Response } from "express"
import calExp from "../expsystem/calExp"
// import calExp from "../expsystem/calexp"

const getExp = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        const checkexp = await prisma.eXP.findFirst({ where: { userId } })
        // calExp(prisma, req.user?.userId || "", "chatAddfriend")
        if (checkexp === null) {
            await prisma.eXP.create({
                data: {
                    currentXP: 0,
                    level: 1,
                    userId: userId,
                },
            })
        }

        const exp = await prisma.eXP.findFirstOrThrow({ where: { userId }, select: { currentXP: true } })
        res.json({
            exp: exp.currentXP,
        })
        console.log(exp)
    } catch (err) {
        res.status(400).send("Error To Get Your CurrentExp")
    }
}

export default getExp
// calExp(res.prisma, userId)