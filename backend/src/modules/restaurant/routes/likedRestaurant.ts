import { Restaurant } from "@apiType/restaurant"
 import { Request, Response } from "express"
 import { getRestaurant, setRestaurant} from ".."

 const likedRestaurant = (req:Request, res:Response) => {
    const id = parseInt(req.params.id)
    let likeOrNot: Restaurant | null = null
    const newdata = getRestaurant().map((restaurant) => {
     if(restaurant.id == id){
            restaurant.status = true
            likeOrNot = restaurant
     }
     return restaurant
    })
     setRestaurant(newdata)
 res.send(likeOrNot)
}
export default likedRestaurant