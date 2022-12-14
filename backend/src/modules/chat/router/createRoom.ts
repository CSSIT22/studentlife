import { Request, Response } from "express"
import { nanoid } from "nanoid"

const createRoom = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const target = req.body.chatWith_id
    const roomId = nanoid()
    const prisma = res.prisma
    try {
        const user_id = await prisma.user_Profile.findUniqueOrThrow({
            select: {
                userId: true,
            },
            where: {
                userId: user,
            },
        })
        const target_name = await prisma.user_Profile.findUniqueOrThrow({
            select: {
                fName: true,
            },
            where: {
                userId: target,
            },
        })
        await prisma.chat_Room.create({
            data: {
                roomName: target_name.fName,
                chatColor: "#E68E5C",
                roomType: "INDIVIDUAL",
                roomId: roomId,
            },
        })
        await prisma.chat_Individual.createMany({
            data: [
                {
                    userId: user_id.userId,
                    anotherUserId: target,
                    roomId: roomId,
                },
            ],
        })
        await prisma.user_To_Room.createMany({
            data: [
                { roomId: roomId, userId: user_id.userId },
                { roomId: roomId, userId: target },
            ],
        })
        res.send(target_name)
    } catch (error) {
        res.status(202).send("error while createRoom" + error)
    }
}
export default createRoom
