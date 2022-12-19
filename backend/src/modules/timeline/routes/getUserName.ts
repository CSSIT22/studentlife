import { Request, Response } from "express"

const getUserName = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || "user id not found"
        const getName = await prisma.user_Profile.findUniqueOrThrow({
            where: { userId },
            select: { fName: true, lName: true },
        })
        res.send(getName)
    } catch (error) {
        res.status(400).send("Error: can not get name")
    }
}

export default getUserName
