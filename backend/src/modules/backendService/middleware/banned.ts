import { Request, Response } from "express"

export const banned = async (req: Request, res: Response) => {
    try {
        const bannedUser = await res.prisma.ban_Status.findFirst({
            where: {
                userId: req.user?.userId || "",
                banTo: Date(),
                reason: "",
                instance: 0,
                banFrom: req.user?.userId || "",
                banId: req.user?.userId || "",
            },
        })
        if (req.user?.userId == bannedUser?.userId) {
            req.logOut
        }
    } catch (err) {
        return res.status(400).send("Fail to Banned.")
    }
}
