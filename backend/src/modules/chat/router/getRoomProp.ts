import { Request, Response } from "express"

const room_prop = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const room_id = req.params.id
        const prisma = res.prisma
        const room_prop = await prisma.user_To_Room.findFirstOrThrow({
            select: {
                room: {
                    select: {
                        roomIndividual: {
                            select: {
                                chatWith: {
                                    select: {
                                        image: true,
                                    },
                                },
                            },
                        },
                        roomName: true,
                        roomId: true,
                        chatColor: true,
                        roomType: true,
                        roomGroup: {
                            select: {
                                groupImg: true,
                            },
                        },
                    },
                },
                userId: true,
            },
            where: {
                room: {
                    roomId: room_id,
                },
                userId: user,
            },
        })
        res.send(room_prop)
    } catch (err) {
        res.status(400).send("ther is not this room in this user")
    }
}
export default room_prop
