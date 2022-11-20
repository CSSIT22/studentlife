import { Request, Response } from "express";

const getRoom = async (req: Request, res: Response) => {
    try {
     
    }
    catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom;