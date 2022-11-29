import { Request, Response } from "express"

const deleteCartProduct = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userId = req.user?.userId
        const productId = parseInt(req.params.productId)
        if (userId != undefined) {
            const deleted = await prisma.shop_Cart.delete({
                where: {userId_productId : {userId, productId}}
            })
            return res.send(deleted)
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send("An error has occurred | " + error)
    }
}

export default deleteCartProduct