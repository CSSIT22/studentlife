import { Shop_Categories } from "@prisma/client"
import { Request, Response } from "express"
const getAllCategories = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const result: Shop_Categories[] = await prisma.shop_Categories.findMany()
        return res.send(result)
    } catch (error) {
        return res.status(404).send("Error! Could not get the Categories")
    }
}

export default getAllCategories
