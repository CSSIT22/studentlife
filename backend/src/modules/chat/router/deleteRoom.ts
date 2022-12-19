import { Request, Response } from "express"

const deleteRoom = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const room_id = req.params.id
    const prisma = res.prisma
    try {
        if (user === undefined) {
            res.status(401).send("Unauthorized")
        }
        await prisma.chat_Nickname.deleteMany({
            where:{
                roomId:room_id
            }
        })
        await prisma.chat_Room.delete({
            where:{
                roomId : room_id
            }
        })
        await prisma.user_To_Room.deleteMany({
            where:{
                roomId : room_id
            }
        })
        res.send("delete Sucessful")
    } catch (error) {
        res.status(400).send("Bad request when deleteRoom "+error)
    }
}
export default deleteRoom
