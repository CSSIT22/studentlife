import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant } from ".."

const showHistory = (req: Request, res: Response) => {
   const userid = parseInt(req.query.userid+"")
   let showHist: Restaurant[] = []
   getRestaurant().forEach((res)=> {
        if(res.userid == userid){
            showHist.push(res)
        }
   })
   res.send(showHist)
}
export default showHistory