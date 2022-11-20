import express from "express"
import { Product, getProducts } from "./dummyData/products"
import getAllProducts from "./routes/getAllProducts"
import getProductInformation from "./routes/getProductInformation"

const shopRoutes = express()

shopRoutes.use(express.json())

shopRoutes.get("/getAllProducts", getAllProducts)
shopRoutes.get("/getProductInformation/:id", getProductInformation)

export default shopRoutes

