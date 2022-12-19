import { Request, Response } from "express"

const setOrderStatus = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const orderId = req.body.orderId
        const changedOrder = await prisma.shop_Order.update({where: {orderId: orderId}, data: {
            orderStatus: req.body.orderStatus 
        }})
        return res.send(changedOrder)
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default setOrderStatus