import { Shop_Product } from "@apiType/shop"
import { Request, Response } from "express"

const  getProductInformation = async (req:Request, res: Response) => {
    try{
        const prisma = res.prisma
        const prodId = req.params.id

        
        let selectedProduct: Shop_Product | null = await prisma.shop_Product.findUnique(
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
                    },
                    contactTo: true
                },
                where: {productId: parseInt(prodId)}
            }
        )
        if (selectedProduct != null) {
            return res.send(selectedProduct)
        }
        return res.status(404).send("No Product Found")
    } catch(err){
        return res.status(404).send("An error has occurred | " + err)
    }
        
}
export default getProductInformation