import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const showRestaurant = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    let selectedRes: Restaurant | null = null
    getRestaurant().forEach((res) => {
        if (res.id == id) {
            selectedRes = res
        }
    })
    res.send([selectedRes])
}
export default showRestaurant
