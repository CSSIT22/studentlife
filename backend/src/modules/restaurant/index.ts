import express from "express"
// import likedRestaurant from "./routes/likedRestaurant"
import showRestaurant from "./routes/showRestaurant"
import showDetail from "./routes/showDetail"
import searchRestaurant from "./routes/searchRestaurant"
import showReview from "./routes/showReview"
import showFavorite from "./routes/showFavorite"
import { restaurant } from "./restaurant"
import { review } from "./review"
import showHistory from "./routes/showHistory"

const restaurantRoutes = express()

export const getRestaurant = () => restaurant
export const getReview = () => review

restaurantRoutes.get("/search", searchRestaurant)
restaurantRoutes.get("/favorite", showFavorite)
restaurantRoutes.get("/history", showHistory)
restaurantRoutes.get("/:id", showRestaurant)
restaurantRoutes.get("/detail/:id", showDetail)
restaurantRoutes.get("/review/:id", showReview)

// restaurantRoutes.post("/:id", likedRestaurant)


export default restaurantRoutes