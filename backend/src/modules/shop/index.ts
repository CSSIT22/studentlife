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
import getAllProductsInCart from "./routes/get/getAllProductsInCart"
import deleteCartProduct from "./routes/delete/deleteCartProduct"
import incrementCPQuantity from "./routes/put/incrementCPQuantity"
import decreaseCPQuantity from "./routes/put/decreaseCPQuantity"
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
// Cart routes
shopRoutes.post("/postCartProduct", postCartProduct)
shopRoutes.get("/getAllProductsInCart", getAllProductsInCart)
shopRoutes.delete("/deleteCartProduct/:productId", deleteCartProduct)
shopRoutes.put("/incrementCPQuantity/:productId", incrementCPQuantity)
shopRoutes.put("/decreaseCPQuantity/:productId", decreaseCPQuantity)
//Test
shopRoutes.get("/gestTestPrisma", gestTestPrisma)


export default shopRoutes
