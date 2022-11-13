import { Request, Response } from "express"

const addExp = async (req: Request, res: Response) => {
    try {
    } catch (err) {
        res.status(400).send("Error To Get Your Exp")
    }
}

export default addExp
