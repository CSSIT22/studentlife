import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const deleteFavorite = (req: Request, res: Response) => {
    const id = req.body.id
    let deleteRes: Restaurant | null = null
    const newdata = getRestaurant().map((restaurant) => {
        if (restaurant.id == id) {
            deleteRes = {
                userid: restaurant.userid,
                id: id,
                resName: restaurant.resName,
                amountOflike: restaurant.amountOflike,
                open: restaurant.open,
                close: restaurant.close,
                phone: restaurant.phone,
                website: restaurant.website,
                vicinity: restaurant.vicinity,
                status: restaurant.status,
                isFavorite: false,
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
                status: restaurant.status,
                isFavorite: restaurant.isFavorite,
                date: restaurant.date,
                img: restaurant.img,
            }
        }
        return restaurant
    })
    setRestaurant(newdata)
    res.send(deleteRes)
}
