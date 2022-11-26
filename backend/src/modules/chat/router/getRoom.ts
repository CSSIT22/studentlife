import { Request, Response } from "express"

const getRoom = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const prisma = res.prisma
        const user_room = await prisma.user_To_Room.findMany({
            select: {
                room :{
                    select:{
                        roomIndividual:{
                            select:{
                                chatWith:{
                                    select:{
                                        image:true,
                                    }
                                }
                            }
                        },roomName:true,roomType:true,roomId:true
                    }
                }
            },
            where: {
                userId: user,
            }
        })
        res.send([...user_room.map((e)=>e.room)])
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom
