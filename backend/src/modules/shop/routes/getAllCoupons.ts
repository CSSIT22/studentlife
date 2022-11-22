import { Request, Response } from "express"
import { getCoupons } from "../dummyData/coupons"

const getAllCoupons = (req: Request, res: Response) => {
    // Need to Add User Coupons
    res.send(getCoupons())
}

export default getAllCoupons