import express from "express"
import likedRestaurant from "./routes/likedRestaurant"
import showRestaurant from "./routes/showRestaurant"
import {Restaurant} from "@apiType/restaurant"
import showDetail from "./routes/showDetail"
import searchRestaurant from "./routes/searchRestaurant"
import { restaurant } from "./restaurant"
const restaurantRoutes = express()

export const getRestaurant = () => restaurant
restaurantRoutes.get("/search", searchRestaurant)

restaurantRoutes.get("/:id", showRestaurant)

restaurantRoutes.get("/detail/:id", showDetail)

restaurantRoutes.post("/:id", likedRestaurant)

export default restaurantRoutes