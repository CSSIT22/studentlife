import { Shop_Product_Images } from "@prisma/client"
import { Request, Response } from "express"
const getProductImages = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const productImages: Shop_Product_Images[] = await prisma.shop_Product_Images.findMany({
            where: {
                productId: parseInt(req.params.id),
            },
        })
        if (productImages.length == 0) {
            return res.status(404).send("No Image Found")
        }
        return res.send(productImages)
    } catch (error) {
        return res.status(404).send("Error! Cannot Get Product Images | " + error)
    }
}

export default getProductImages
