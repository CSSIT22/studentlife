import { Request, Response } from "express"

const room_prop = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const room_id = req.params.id
        const prisma = res.prisma
        const find_roomType = await prisma.chat_Room.findUniqueOrThrow({
            select:{
                roomType : true
            },where:{
                roomId:room_id
            }
        })
        if(find_roomType.roomType === "INDIVIDUAL"){
            const room_prop = await prisma.user_To_Room.findFirstOrThrow({
                select: {
                    room: {
                        select: {
                            chatColor: true,
                            roomId: true,
                            roomType: true,
                        },
                    },
                    //userId: true,
                },
                where: {
                    room: {
                        roomId: room_id
                    },
                    userId: user,
                },
            })
            const get_nick = await prisma.chat_Nickname.findFirstOrThrow({
                select:{
                    nickname:true,nameWho:{select:{image:true}}
                },where:{
                     userId : user ,roomId : room_id
                }
            })
            res.send({...room_prop.room,...get_nick})
        }else{
            const room_prop = await prisma.user_To_Room.findFirstOrThrow({
                select: {
                    room: {
                        select: {
                            chatColor: true,
                            roomId: true,
                            roomType: true,
                            group: {
                                select:{
                                    roomName:true
                                }
                            },
                        },
                    },
                    //userId: true,
                },
                where: {
                    room: {
                        roomId: room_id,
                    },
                    userId: user,
                },
            })
            res.send(room_prop.room)
        }
    } catch (err) {
        res.status(400).send("ther is not this room in this user")
    }
}
export default room_prop
