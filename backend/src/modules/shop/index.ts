import express from "express"
import getAllProducts from "./routes/getAllProducts"
import getProductInformation from "./routes/getProductInformation"
import getAllCategories from "./routes/getAllCategories"
import getAllProductsInCategory from "./routes/getAllProductsInCategory"
const shopRoutes = express()

shopRoutes.use(express.json())

shopRoutes.get("/getAllProducts", getAllProducts)
shopRoutes.get("/getProductInformation/:id", getProductInformation)
shopRoutes.get("/getAllCategories", getAllCategories)
shopRoutes.get("/getAllProductsInCategory/:id", getAllProductsInCategory)
export default shopRoutes
