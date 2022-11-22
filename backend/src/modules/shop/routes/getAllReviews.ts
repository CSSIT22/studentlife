import { Request, Response } from "express"
import { getReviews } from "../dummyData/reviews"
import { users } from "../dummyData/user"

const getAllReviews = (req: Request, res: Response) => {
    try {
        let pId = req.params.productId
        let filteredReviews = getReviews().filter((r) => r.productId.toString() === pId)
        if (filteredReviews.length == 0){
            return res.status(404).send("No review Found")
        }
        return res.send([filteredReviews, users])
    } catch (error) {
        return res.status(404).send("No review Found")
    }
}

export default getAllReviews