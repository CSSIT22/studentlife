import e, { Request, Response } from "express"

const getRoom = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const prisma = res.prisma
        const Room_list = await prisma.user_To_Room.findMany({
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
                        roomId: true,
                        chatColor: true,
                        roomType: true,
                        roomName: true,
                        roomGroup: {
                            select: {
                                groupImg: true,
                            },
                        },
                    },
                },
            },
            where: {
                userId: user,
            },
        })
        res.send(Room_list.map((e) => e.room))
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom
