import { Shop_Product } from "@prisma/client"
import { Request, Response } from "express"

const  getProductInformation = async (req:Request, res: Response) => {
    try{
        const prisma = res.prisma
        const prodId = req.params.id

        
        let selectedProduct: Shop_Product | null = await prisma.shop_Product.findUnique(
            {
                include: {
                    images: {
                        select: {image: true}
                    },
                    contactTo: true,
                    userReview: {
                        include:{
                            user: {
                                select: {
                                    userId: true,
                                    fName: true,
                                    lName: true,
                                }
                            }
                        }
                    }
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