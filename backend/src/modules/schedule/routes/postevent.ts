import { Request, Response } from "express"

const postevent = (req: Request, res: Response) => {
    const id = req.params.id
    res.send("Hello " + id)
}

export default postevent
