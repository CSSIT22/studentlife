import { Request, Response } from "express"

const incrementCPQuantity = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userId = req.user?.userId
        const productId = parseInt(req.params.productId)
        if (userId != undefined) {
            const currentQuantityStock = await prisma.shop_Cart.findUnique({
                where: { userId_productId: { userId, productId } },
                select: {
                    quantity: true,
                    product: { select: { productStock: true } },
                },
            })
            if (currentQuantityStock != null) {
                let newQuantity = currentQuantityStock.quantity + 1
                let currentStock = currentQuantityStock.product.productStock
                // Add code to handle changes in stock
                if (newQuantity > currentStock && currentStock > 0) {
                    newQuantity = currentStock
                } else if( currentStock < 0){
                    newQuantity = 0
                }
                const updateCartProduct = await prisma.shop_Cart.update({
                    where: { userId_productId: { userId, productId } },
                    data: {
                        quantity: newQuantity,
                    },
                })
                return res.send(updateCartProduct)
            } else {
                return res.status(404).send("Product not found in cart")
            }
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send("An error has ocurred | " + error)
    }
}

export default incrementCPQuantity
