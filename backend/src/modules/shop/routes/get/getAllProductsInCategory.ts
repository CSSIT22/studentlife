import { Request, Response } from "express"
import { Shop_Product } from "@prisma/client"


const getAllProductsInCategory = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const catId = req.params.id
        let products: Shop_Product[] | null = await prisma.shop_Product.findMany({
            include: {
                images: {
                    select: {image: true}
                }
            },
            where: {categoryId: parseInt(catId)}
        })
        res.send(products)
    } catch (error) {
        return res.status(404).send("An Error has occurred | " + error)
    }
}
export default getAllProductsInCategory
