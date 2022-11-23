import { Request, Response } from "express"
import { Category } from "@apiType/shop"
import { getCategories } from "../dummyData/categories"
const getAllCategories = (req: Request, res: Response) => {
    try {
        res.send(getCategories())
    } catch (error) {
        res.status(404).send("An unknown error occurred")
    }
}

export default getAllCategories
