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
import postUserReview from "./routes/post/postUserReview"
import postUserOrder from "./routes/post/postUserOrder"
import postUserCoupon from "./routes/post/postUserCoupon"
import getAllUserCoupons from "./routes/get/getAllUserCoupons"
import getOrderInformation from "./routes/get/getOrderInformation"
import getAllOrders from "./routes/get/getAllOrders"
import getCouponInformation from "./routes/get/getCouponInformation"
import setOrderStatus from "./routes/put/setOrderStatus"
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
shopRoutes.post("/postUserReview", postUserReview)
// Contact routes
shopRoutes.get("/getContactInfo/:id", getContactInfo)
// Coupon Routes --> Not Complete
shopRoutes.get("/getAllCoupons", getAllCoupons)
shopRoutes.post("/postUserCoupon", postUserCoupon)
shopRoutes.get("/getAllUserCoupons", getAllUserCoupons)
shopRoutes.get("/getCouponInformation/:couponCode", getCouponInformation)
// Cart routes
shopRoutes.post("/postCartProduct", postCartProduct)
shopRoutes.get("/getAllProductsInCart", getAllProductsInCart)
shopRoutes.delete("/deleteCartProduct/:productId", deleteCartProduct)
shopRoutes.put("/incrementCPQuantity/:productId", incrementCPQuantity)
shopRoutes.put("/decreaseCPQuantity/:productId", decreaseCPQuantity)
// Order routes
shopRoutes.post("/postUserOrder", postUserOrder)
shopRoutes.get("/getOrderInformation/:orderId", getOrderInformation)
shopRoutes.get("/getAllOrders", getAllOrders)
shopRoutes.put("/setOrderStatus", setOrderStatus)
//Test
shopRoutes.get("/gestTestPrisma", gestTestPrisma)

export default shopRoutes
