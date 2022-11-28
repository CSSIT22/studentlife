import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."

const searchRestaurant = (req: Request, res: Response) => {
    const name = req.query.name + ""
    let searchRes: Restaurant[] = []
    getRestaurant().forEach((res) => {
        if (res.resName.substring(0, name.length).toLowerCase() == name.substring(0, name.length).toLowerCase()) {
            searchRes.push(res)
        }
    })
    res.send(searchRes)
}
export default searchRestaurant
