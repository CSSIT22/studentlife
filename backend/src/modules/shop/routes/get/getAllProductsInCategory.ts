import { Request, Response } from "express"
import { Shop_Product } from "@apiType/shop"


const getAllProductsInCategory = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const catId = req.params.id
        let products: Shop_Product[] | null = await prisma.shop_Product.findMany({
            select: {
                productId: true,
                categoryId: true,
                contactId: true,
                productName: true,
                productDesc: true,
                productColor: true,
                productSize: true,
                productPrice: true,
                productStock: true,
                brandName: true,
                deliveryFees: true
            },
            where: {categoryId: parseInt(catId)}
        })
        res.send(products)
    } catch (error) {
        return res.status(404).send("An Error has occurred | " + error)
    }
}
export default getAllProductsInCategory
