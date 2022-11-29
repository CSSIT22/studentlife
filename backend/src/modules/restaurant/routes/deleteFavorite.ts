import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const deleteFavorite = (req: Request, res: Response) => {
    const id = req.body.id
    let deleteRes: Restaurant | null = null
    const newdata = getRestaurant().map((restaurant) => {
        if (restaurant.id == id) {
            restaurant.isFavorite = false
            deleteRes = restaurant
            
        }
        return restaurant
    })
  
    
    setRestaurant(newdata)
    res.send(deleteRes)
}
export default deleteFavorite
