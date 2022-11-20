import { Request, Response } from "express"
import { getAllShop, Shop, shops } from ".."

const getShop = (req: Request, res: Response) => {
    const id = req.params.id
    let getshop: Shop | null = null
    getAllShop().forEach((shop) => {
        if (shop.shopId == id) {
            getshop = shop
        }
    })
    if (getshop != null) {
        return res.send(getshop)
    }
    return res.status(404).send("Shop not found!!")
}

export default getShop
