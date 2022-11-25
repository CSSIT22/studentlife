import { Request, Response } from "express"

export const banned = async (req: Request, res: Response) => {
    try {
        const bannedUser = await res.prisma.ban_Status.findFirst({
            where: {
                userId: req.user?.userId || "",
                instance: {
                    gte: 10,
                },
            },
        })
        if (bannedUser?.banTo || new Date() > new Date()) {
            req.logout((err) => {
                return err
            })
        }
    } catch (err) {
        return res.status(400).send("Fail to Banned.")
    }
}
