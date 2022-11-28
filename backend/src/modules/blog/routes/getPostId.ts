import { Request, Response } from "express"
import { postTextbodies,postes } from ".."

const getPostId = (req: Request, res: Response) => {
    res.send(postes)
    console.log(postes)
}

export default getPostId
