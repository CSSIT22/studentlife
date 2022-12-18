import { Request, Response } from "express"
const getUserEmail = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userEmail = await prisma.user_Profile.findFirstOrThrow({
            select: {
                email: true,
            },
            where: {
                userId: req.params.userId,
            },
        })
        return res.send(userEmail)
    } catch (err) {
        return res.status(400).send("There is an error finding user")
    }
}
export default getUserEmail
