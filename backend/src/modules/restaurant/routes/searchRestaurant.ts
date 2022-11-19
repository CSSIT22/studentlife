import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."

const searchRestaurant = (req: Request, res: Response) => {
    const name  = req.query.name
    console.log(name)
      let searchRes: Restaurant | null = null
      getRestaurant().forEach((res) => {
        // if (res.resName.substring(0,name?.length) === name.le) {
        //   searchRes = res
        // }
    })
    res.send(searchRes)
}
export default searchRestaurant
