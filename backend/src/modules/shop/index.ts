import express from "express"
import getAllProducts from "./routes/getAllProducts"
import getProductInformation from "./routes/getProductInformation"
import getAllCategories from "./routes/getAllCategories"
import getAllProductsInCategory from "./routes/getAllProductsInCategory"
import getAllReviews from "./routes/getAllReviews"
const shopRoutes = express()

shopRoutes.use(express.json())
// Product Routes
shopRoutes.get("/getAllProducts", getAllProducts)
shopRoutes.get("/getProductInformation/:id", getProductInformation)
// Category Routes
shopRoutes.get("/getAllCategories", getAllCategories)
shopRoutes.get("/getAllProductsInCategory/:id", getAllProductsInCategory)
// Review Routes
shopRoutes.get("/getAllReviews/:productId", getAllReviews)

export default shopRoutes

