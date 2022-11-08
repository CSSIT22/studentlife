import { NextFunction, Request, Response } from "express"

export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await res.prisma.user_Profile.findFirstOrThrow({
            where: { userId: req.user?.userId },
            select: { fName: true, lName: true, email: true, userId: true, levels: true, studentId: true },
        })
        req.user = { ...user }
        return next()
    } catch (err) {
        return res.status(400).send("Error finding user.")
    }
}
