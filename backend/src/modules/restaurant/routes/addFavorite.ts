import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const addFavorite = (req:Request, res:Response) => {
 const id = parseInt(req.params.id)
 let addResToFavor: Restaurant | null = null
 const newdata = getRestaurant().map((restaurant) => {
    if (restaurant.id == id) {
        restaurant.isFavorite = true
        addResToFavor = restaurant
        console.log(addResToFavor);
        
    }
    return restaurant
})
setRestaurant(newdata)
res.send(addResToFavor)
}

export default addFavorite