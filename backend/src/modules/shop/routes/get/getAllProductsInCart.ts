import { Request, Response } from "express"

const getAllProductsInCart = async (req: Request, res: Response) => {
    try{
        const prisma = res.prisma
        const userId = req.user?.userId
        if (userId != undefined){
            const products = await prisma.shop_Cart.findMany({
                select: {
                    productId: true,
                    quantity: true,
                    product: {
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
                },
                where: { userId: userId}
            })
            return res.send(products)
        }
        return res.status(404).send("No User Found")
    } catch(err){
        return res.status(404).send("An error has occurred | " + err)
    }
}

export default getAllProductsInCart