import { Request, Response } from "express"
import { Category, Product } from "@apiType/shop"
import { getCategories } from "../dummyData/categories"
import { getProducts } from "../dummyData/products"

const getAllProductsInCategory = (req: Request, res: Response) => {
    try {
        const catId = req.params.id
        let filtered_products: Product[] = []
        let products = getProducts()
        for (let i = 0; i < products.length; i++) {
            if (catId === products[i].categoryId.toString()) {
                filtered_products.push(products[i])
            }
        }
        res.send(filtered_products)
    } catch (error) {
        return res.status(404).send("No Category Found")
    }
}
export default getAllProductsInCategory
