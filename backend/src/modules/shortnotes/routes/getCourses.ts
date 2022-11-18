import { Request, Response } from "express"
import { course } from ".."

const getCourses = (req: Request, res: Response) => {
    res.send(course)
}

export default getCourses
