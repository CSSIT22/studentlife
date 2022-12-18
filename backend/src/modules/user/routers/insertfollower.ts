import { Request, Response } from "express"

const insertfollow = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        // const anotherUserId = req.Follow ? req.Follow.anotherUserId : ""
        const follower = await prisma.follow.create({
            // where: {
            //     userId: userId,
            // },
            data: {
                userId: userId,
                anotherUserId: anotherUserId,
            },
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({ message_error: err })
    }
}

export default insertfollow
