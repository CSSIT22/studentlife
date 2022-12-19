import { Shop_Cart, Shop_Order, Shop_Order_Product } from "@prisma/client"
import { Request, Response } from "express"

const postUserOrder = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        if (user != undefined){
            const trans = await prisma.transaction.create({
                data: {
                    userId: user,
                    totalPrice: req.body.totalPrice
                }
            })
            let orderUser: Shop_Order
            if (req.body.couponCode){
                orderUser = await prisma.shop_Order.create({
                    data: {
                        userId: user,
                        transId: trans.transId,
                        couponCode: req.body.couponCode,
                        totalPrice: req.body.totalPrice,
                        totalDeliveryFees: req.body.totalDeliveryFees,
                        shipping: req.body.shipping,
                        orderPlaced: req.body.orderPlaced,
                        orderStatus: req.body.orderStatus
                    }
                })
            } else {
                orderUser = await prisma.shop_Order.create({
                    data: {
                        userId: user,
                        transId: trans.transId,
                        totalPrice: req.body.totalPrice,
                        totalDeliveryFees: req.body.totalDeliveryFees,
                        shipping: req.body.shipping,
                        orderPlaced: req.body.orderPlaced,
                        orderStatus: req.body.orderStatus
                    }
                })
            }
            
            const cartProducts = await prisma.shop_Cart.findMany({select: {productId: true, quantity: true}, where: {userId: user}})
            const orderProducts: {
                productId: number;
                quantity: number;
                orderId: string
            }[] = []
            for (let i = 0; i < cartProducts.length; i++){
                orderProducts.push({...cartProducts[i], orderId: orderUser.orderId})
            }
            const postedProducts = await prisma.shop_Order_Product.createMany({
                data: orderProducts
            })
            return res.send(orderUser)
        }
        return res.status(404).send("User not found!")
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default postUserOrder

//Template
// import { Request, Response } from "express"

// const postUserOrder = async (req: Request, res: Response) => {
//     try {
//         const prisma = res.prisma
//         const user = req.user?.userId
//         if (user != undefined){

//         }
//         return res.status(404).send("User not found!")
//     } catch (error) {
//         return res.status(404).send("An error has occured | " + error)
//     }
// }

// export default postUserOrder