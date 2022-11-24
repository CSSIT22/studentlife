import { Request, Response } from "express"
import { getRestaurant, getReview } from ".."
import { Restaurant, Review } from "@apiType/restaurant"
import { review } from "../review"
const showReview = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    let selectedRes: Restaurant | null = null
    getRestaurant().forEach((res) => {
        if (res.id == id) {
            selectedRes = res
        }
    })

    let selectedRevi: Review[] = []
    getReview().forEach((res) => {
        if (res.resId == id) {
            selectedRevi.push(res)
        }
    })
    // const Sresult = selectedRes, selectedRevi
    // res.send([selectedRes])
    // res.send([selectedRes, selectedRevi])
    res.send({resD: [selectedRes], reviD:[selectedRevi]})
    
    

}
export default showReview
