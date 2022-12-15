import { Request, Response } from "express"
// import { getRoomProp, Room, setRoom } from ".."

const editRoomProp = async (req: Request, res: Response) => {
    const id = req.params.id
    const prisma = res.prisma
    const chatColor = req.query.chatColor
    const roomName = req.query.roomName
    if (roomName != null) {
        await prisma.chat_Room.update({
            where: {
                roomId: id,
            },
            data: {
                //roomName: `${roomName}`,
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
