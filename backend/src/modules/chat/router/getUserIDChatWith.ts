import { Request, Response } from "express"

const getQuote = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const id = req.params.id
        const user = req.user?.userId
        const userChatWith = await prisma.chat_Nickname.findFirst({
            select: {
                anotherUserId: true,
            },
            where: {
                roomId: id,
                userId: user,
            },
        })
        res.send(userChatWith)
    } catch {
        res.status(400).send("Error can't find user")
    }
}

export default getQuote
