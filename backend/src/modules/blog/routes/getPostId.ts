import { Request, Response } from "express"
import { postDetail } from ".."

const getPostId = (req:Request, res:Response) => {
    res.send(postDetail)
}

export default getPostId