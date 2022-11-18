import { Request, Response } from "express"
import {Restaurant} from "@apiType/restaurant"
import { getRestaurant } from ".."

const searchRestaurant = (req:Request, res:Response) => {
  const name = req.params.id
  let searchRes: Restaurant | null = null
  getRestaurant().forEach((res) => {
    if (res.resName.substring(0,name?.length) == name?.substring(0,name?.length)) {
      searchRes = res
      console.log(name);
      
    }
})
 res.send(searchRes)
}
export default searchRestaurant