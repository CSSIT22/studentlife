import { Shop_Product} from "@apiType/shop"
import { Request, Response } from "express"

const getAllProducts = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const result: Shop_Product[] = await prisma.shop_Product.findMany(
           {
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
                deliveryFees: true,
                images: {
                    select: {image: true}
                }
            }
           }
        )
        return res.send(result)
    } catch (error) {
        return res.status(404).send("Error! Could not get the Products" + error)
    }
}

export default getAllProducts