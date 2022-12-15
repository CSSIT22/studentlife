import { Shop_Product } from "@prisma/client"
import { Request, Response } from "express"

const getAllProducts = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const result: Shop_Product[] = await prisma.shop_Product.findMany({
            include: {
                images: {
                    select: { image: true },
                },
            },
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("Error! Could not get the Products" + error)
    }
}

export default getAllProducts
