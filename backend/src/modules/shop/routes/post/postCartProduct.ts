import { Shop_Cart } from "@prisma/client"
import { Request, Response } from "express"

const postCartProduct = async (req: Request, res: Response) => {
    try{
    const prisma = res.prisma
    const userId = req.user?.userId
    const productId: number = req.body.productId
    if (userId){
        const createCartProduct: Shop_Cart = await prisma.shop_Cart.create({
            data: {
                userId: userId,
                productId: productId,
                quantity: 1
            }
        })
        return res.send(createCartProduct)
    }
    return res.status(404).send("User not found")}
    catch (err) {
        return res.status(404).send("An error has occurred | "+ err)
    }
    
}

export default postCartProduct