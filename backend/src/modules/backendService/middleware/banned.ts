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
        })
        if (bannedUser && bannedUser.banTo > new Date()) {
            req.logout((err) => {
                console.log("YOU ARE BANNED FROM THE SYSTEM!")
                return err
            })
        }
        return next()
    } catch (err) {
        return res.status(400).send("Fail to Banned.")
    }
}
