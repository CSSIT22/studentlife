import { Request,Response } from "express";

const getRoom = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const Room = await prisma.user_To_Room.findMany();
        res.send(Room);
    } catch (err) {
        res.status(400).send(err);
    }
}

export default getRoom;