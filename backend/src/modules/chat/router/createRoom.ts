import { Request, Response } from "express"
import { nanoid } from "nanoid"
import { use } from "passport"

const createRoom = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const target = req.body.chatWith_id
    const room_Id = nanoid()
    const prisma = res.prisma
    try {
        const user_find = await prisma.user_Profile.findUniqueOrThrow({
            select:{
                userId:true,fName:true
            },where:{
                userId:user
            }
        })
        const target_name = await prisma.user_Profile.findUniqueOrThrow({
            select: {
                fName: true,
            },
            where: {
                userId:target
            },
        })
        await prisma.chat_Room.create({
            data: {
                chatColor: "#E68E5C",
                roomType: "INDIVIDUAL",
                roomId: room_Id,
            },
        })
        await prisma.chat_Nickname.createMany({
            data:[
                {
                    userId:user_find.userId,
                    anotherUserId:target,
                    nickname:target_name.fName,
                    roomId:room_Id
                },
                {
                    userId:target,
                    anotherUserId:user_find.userId,
                    nickname:user_find.fName,
                    roomId:room_Id
                }
            ]
        })
        await prisma.user_To_Room.createMany({
            data: [
                { roomId: room_Id, userId: user_find.userId },
                { roomId: room_Id, userId: target },
            ],
        })
        res.send(target_name.fName)
    } catch (error) {
        res.status(202).send("error while createRoom" + error)
    }
}
export default createRoom
