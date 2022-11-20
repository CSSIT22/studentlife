import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."
const showFavorite = (req: Request, res: Response) => {
    const userid = parseInt(req.query.userid+"")
    let isFavorite: Restaurant[] = []
    getRestaurant().forEach((res) => {
        if (res.userid == userid) {
            if(res.isFavorite == true){
                isFavorite.push(res)
            }          
        }
    })
    res.send(isFavorite)
}
export default showFavorite
