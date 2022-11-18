import { Request, Response } from "express"
import { rsn } from ".."

const getResentShortnotes = (req: Request, res: Response) => {
    res.send(rsn)
}

export default getResentShortnotes
