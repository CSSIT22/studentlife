import { Request, Response } from "express"
import { use } from "passport"

const getblockuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const isBlocked = await prisma.user_Blocked.findFirst({
            // include: { anotherUserId: true },
            where: {
                userId: userId,
                anotherUserId: req.params.id,
            },
        })

        if (isBlocked) {
            return res.send(true)
        }

        // res.status(200).json({ user: profile })
    } catch (err) {
        return res.status(400).send(err)
    }
}

export default getblockuser
