import e, { Request, Response } from "express"

const getRoom = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const prisma = res.prisma
        const Room_list = await prisma.chat_Room.findFirst({
          select:{
            
          }
        })
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom
