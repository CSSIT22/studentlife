import { Request, Response } from "express"
// import { getRoomProp, Room, setRoom } from ".."

const editRoomProp = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const id = req.params.id
    const prisma = res.prisma
    const chatColor = req.query.chatColor
    const roomName = req.query.roomName
    if(user === undefined){
        res.status(401).send("Unauthen")
    }
    const user_id = await prisma.user_Profile.findUniqueOrThrow({
        select:{
            userId : true
        },where:{
            userId:user
        }
    })
    const target_id = await prisma.chat_Nickname.findFirstOrThrow({
        select:{
            anotherUserId:true
        },where:{
            roomId:id,userId:user
        }
    })
    if (roomName != null) {
        await prisma.chat_Nickname.update({
            where: {
                userId_anotherUserId_roomId:{
                    roomId:id,userId:user_id.userId,anotherUserId:target_id.anotherUserId
                }
            },
            data: {
                nickname: `${roomName}`,
            },
        })
    }
    if (chatColor != null) {
        await prisma.chat_Room.update({
            where: {
                roomId: id,
            },
            data: {
                chatColor: `${chatColor}`,
            },
        })
    }
    res.redirect(`/chat/${id}`)
}

export default editRoomProp
