import { Request, Response } from "express"
import { nanoid } from "nanoid"

const createRoom = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const target = req.body.chatWith_id
    const room_Id = nanoid()
    const prisma = res.prisma
    try {
        if(user === null){
            res.status(202).send("log in first!!")
        }
        const user_id = await prisma.user_Profile.findFirstOrThrow({
            select:{
                userId:true
            },where:{
                userId:user
            }
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
                chatColor: "#E68E5C",
                roomType: "INDIVIDUAL",
                roomId: room_Id,
            },
        })
        await prisma.chat_Nickname.create({
            data:{
                userId:user_id.userId,
                anotherUserId:target,
                nickname:target_name.fName,
                roomId:room_Id
            }
        })
        await prisma.user_To_Room.createMany({
            data: [
                { roomId: room_Id, userId: user_id.userId },
                { roomId: room_Id, userId: target },
            ],
        })
        res.send(target_name)
    } catch (error) {
        res.status(202).send("error while createRoom" + error)
    }
}
export default createRoom
