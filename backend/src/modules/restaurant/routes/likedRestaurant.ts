import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const likedRestaurant = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    let likeOrNot: Restaurant | null = null
    const newdata = getRestaurant().map((restaurant) => {
        if (restaurant.id == id) {
            likeOrNot = {
                userid: restaurant.userid,
                id: id,
                resName: restaurant.resName,
                amountOflike: restaurant.amountOflike,
                open: restaurant.open,
                close: restaurant.close,
                phone: restaurant.phone,
                website: restaurant.website,
                vicinity: restaurant.vicinity,
                status: true,
                isFavorite: restaurant.isFavorite,
                date: restaurant.date,
                img: restaurant.img,
            }
            return {
                userid: restaurant.userid,
                id: id,
                resName: restaurant.resName,
                amountOflike: restaurant.amountOflike,
                open: restaurant.open,
                close: restaurant.close,
                phone: restaurant.phone,
                website: restaurant.website,
                vicinity: restaurant.vicinity,
                status: true,
                isFavorite: restaurant.isFavorite,
                date: restaurant.date,
                img: restaurant.img,
            }
        }
        return restaurant
    })
    setRestaurant(newdata)
    res.send(likeOrNot)
}
export default likedRestaurant
