import { prisma, Shop_Cart, Shop_Order, Shop_Order_Product } from "@prisma/client"
import { Request, Response } from "express"
import RandExp = require("randexp");
// Remove from user coupons
// If possible add previously used coupon check in getuserCoupons by checking with Shop_order at user_Id and coupon_Id
const postUserOrder = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        async function  createTransactionId(){
            while (true){
                let newId = new RandExp(/^([A-Z]){5}([0-9]){5}([A-Z]){5}$/).gen();
                const checkTransId = await prisma.transaction.findUnique({where: {transId: newId}})
                if (checkTransId == null){
                    return newId
                }
            }
        }
        if (user != undefined){
            let transId = await createTransactionId()
            const trans = await prisma.transaction.create({
                data: {
                    transId: transId,
                    userId: user,
                    totalPrice: req.body.totalPrice
                }
            })
            let orderUser: Shop_Order
            if (req.body.couponCode){
                let updateCoupon = await prisma.shop_Coupon.update({
                    where: {couponCode: req.body.couponCode},
                    data: {
                        quota: {
                            decrement: 1
                        }
                    }
                })
                orderUser = await prisma.shop_Order.create({
                    data: {
                        userId: user,
                        transId: trans.transId,
                        couponCode: req.body.couponCode,
                        totalPrice: req.body.totalPrice,
                        totalDeliveryFees: req.body.totalDeliveryFees,
                        shipping: req.body.shipping,
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
                let updateProductStock = await prisma.shop_Product.update({
                    where: {productId: cartProducts[i].productId},
                    data: { productStock: {
                        decrement: cartProducts[i].quantity
                    }}
                })
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