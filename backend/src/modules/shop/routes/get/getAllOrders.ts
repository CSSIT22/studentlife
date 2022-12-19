import { Shop_Order } from "@prisma/client"
import { Request, Response } from "express"

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userId = "9kcmTSjNL2AgGh7b3h7FI"
        if (userId != undefined){
            const orderDetails: Shop_Order[] | null = await prisma.shop_Order.findMany({
                include: {
                    products : {
                        include: {
                            product: {
                                include: {
                                    images: true
                                }
                            }
                        }
                    }
                },
                where: {
                    userId: userId
                },
                orderBy: {
                    orderPlaced: 'desc'
                }
            })
            return res.send(orderDetails)
        }
        return res.status(404).send("User Not Found")
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default getAllOrders