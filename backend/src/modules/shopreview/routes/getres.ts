import { Request, Response } from "express"
import { getAllRestaurant, Restaurant } from ".."

const getRest = (req: Request, res: Response) => {
    const id = req.params.id
    let getrestaurant: Restaurant | null = null
    getAllRestaurant().forEach((rest) => {
        if (rest.restaurantId == id) {
            getrestaurant = rest
        }
    })
    if (getrestaurant != null) {
        return res.send(getrestaurant)
    }
    return res.status(404).send("Restaurant not found!!")
}

export default getRest
