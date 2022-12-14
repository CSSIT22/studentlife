import { Shop_Order } from "@prisma/client"
import { Request, Response } from "express"

const getOrderInformation = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const orderDetails: Shop_Order | null = await prisma.shop_Order.findUnique({
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
                orderId: req.params.orderId,
            }
    })
        return res.status(404).send(orderDetails)
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default getOrderInformation