import express from "express"
import getAllProducts from "./routes/getAllProducts"
import getProductInformation from "./routes/getProductInformation"
import getAllCategories from "./routes/getAllCategories"
import getAllProductsInCategory from "./routes/getAllProductsInCategory"
import getAllReviews from "./routes/getAllReviews"
import gestTestPrisma from "./routes/gestTestPrisma"
import getContactInfo from "./routes/getContactInfo"
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
// Contact routes
shopRoutes.get("/getContactInfo/:id", getContactInfo)

//Test
shopRoutes.get("/gestTestPrisma", gestTestPrisma)
export default shopRoutes

