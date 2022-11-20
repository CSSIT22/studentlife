import { Request, Response } from "express"
import { getProducts } from "../dummyData/products"

const getAllProducts = (req: Request, res: Response) => {
    res.send(getProducts())
}

export default getAllProducts