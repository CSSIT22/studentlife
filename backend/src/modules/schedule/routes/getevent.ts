import { Request, Response } from "express"
import {} from ".."

const getevent = (req: Request, res: Response) => {
    const id = req.params.id
    res.send("Hello " + id)
}

export default getevent
