import { Request, Response } from "express"

const getAllProductsInCart = async (req: Request, res: Response) => {
    try{
        const prisma = res.prisma
        const userId = req.user?.userId
        if (userId != undefined){
            const products = await prisma.shop_Cart.findMany({
                select: {
                    productId: true,
                    quantity: true
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