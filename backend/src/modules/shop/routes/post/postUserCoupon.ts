import { User_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const postUserCoupon = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        if (user != undefined){
            const coupon: User_Coupon = await prisma.user_Coupon.create({
                data: {
                    userId: user,
                    couponCode: req.body.couponCode
                }
            })
            return res.send(coupon)
        }
        return res.status(404).send("User not found!")
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default postUserCoupon