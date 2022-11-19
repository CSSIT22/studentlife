import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant } from ".."

const likedRestaurant = (req:Request, res:Response) => {
//   const id = parse(req.query.status)
  let likeRestaurantOrNot : Restaurant | null = null
  getRestaurant().forEach((res) => {
    if (res.id == id) {
        likeRestaurantOrNot = res
        likeRestaurantOrNot.status = true
    }
})
 
}
export default likedRestaurant