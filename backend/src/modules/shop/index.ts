import express from "express"
import getAllProducts from "./routes/get/getAllProducts"
import getProductInformation from "./routes/get/getProductInformation"
import getAllCategories from "./routes/get/getAllCategories"
import getAllProductsInCategory from "./routes/get/getAllProductsInCategory"
import getAllReviews from "./routes/get/getAllReviews"
import gestTestPrisma from "./routes/get/gestTestPrisma"
import getContactInfo from "./routes/get/getContactInfo"
import getAllCoupons from "./routes/get/getAllCoupons"
import getProductImages from "./routes/get/getProductImages"
import postCartProduct from "./routes/post/postCartProduct"
const shopRoutes = express()

shopRoutes.use(express.json())
// Product Routes
shopRoutes.get("/getAllProducts", getAllProducts)
shopRoutes.get("/getProductInformation/:id", getProductInformation)
shopRoutes.get("/getProductImages/:id", getProductImages)
// Category Routes
shopRoutes.get("/getAllCategories", getAllCategories)
shopRoutes.get("/getAllProductsInCategory/:id", getAllProductsInCategory)
// Review Routes
shopRoutes.get("/getAllReviews/:productId", getAllReviews)
// Contact routes
shopRoutes.get("/getContactInfo/:id", getContactInfo)
// Coupon Routes --> Not Complete
shopRoutes.get("/getAllCoupons", getAllCoupons)

// Post Routes
// Cart routes
shopRoutes.post("/postCartProduct", postCartProduct)

//Test
shopRoutes.get("/gestTestPrisma", gestTestPrisma)


export default shopRoutes

