import { Request, Response, NextFunction } from "express"

export const banned = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bannedUser = await res.prisma.ban_Status.findFirst({
            where: {
                userId: req.user?.userId || "",
                instance: {
                    gte: 10,
                },
            },
            select: {
                banTo: true,
                userId: true,
                reason: true,
            },
        })
        if (bannedUser && bannedUser.banTo > new Date()) {
            req.logout((err) => {
                console.log("YOU ARE BANNED FROM THE SYSTEM!")
                return err
            })
        } else if (bannedUser && bannedUser.banTo < new Date()) {
            await res.prisma.ban_Status.delete({
                where: {
                    userId_reason: {
                        userId: bannedUser.userId,
                        reason: bannedUser.reason,
                    },
                },
            })
        }
        return next()
    } catch (err) {
        return res.status(400).send("Fail to Banned.")
    }
}
