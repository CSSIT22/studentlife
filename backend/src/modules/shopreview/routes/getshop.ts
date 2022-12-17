import { Request, Response } from "express"

const getShop = async (req: Request, res: Response) => {
    // const id = req.params.id
    // let getshop: Shop | null = null
    // getAllShop().forEach((shop) => {
    //     if (shop.shopId == id) {
    //         getshop = shop
    //     }
    // })
    // if (getshop != null) {
    //     return res.send(getshop)
    // }
    // return res.status(404).send("Shop not found!!")
    try {
        const prisma = res.prisma
        const id = req.params.id
        const shop = await prisma.sReview_Shop.findMany({
            where: {
                shopId: id,
            },
        })
        res.send(shop)
    } catch {
        res.status(400).send("Error can't find quote")
    }
}

export default getShop
