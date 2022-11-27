import { Request, Response } from "express"
import { Product } from "@apiType/shop"
import { getProducts } from "../dummyData/products"

const getProductInformation = (req: Request, res: Response) => {
    const prodId = req.params.id
    let selectedProduct: Product | null = null
    getProducts().forEach((product) => {
        if (product.productId.toString() === prodId) {
            selectedProduct = product
        }
    })
    if (selectedProduct != null) {
        return res.send(selectedProduct)
    }
    return res.status(404).send("No Product Found")
}
export default getProductInformation
