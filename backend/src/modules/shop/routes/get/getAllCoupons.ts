import { User_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const getAllCoupons = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userid = req.user?.userId
        if (userid != undefined) {
            const coupons = await prisma.user_Coupon.findMany({
                select: {
                    coupon: true,
                },
                where: { userId: userid },
            })
            let couponDetails = []
            for (let i = 0; i < coupons.length; i++) {
                let expDate = new Date(coupons[i].coupon.validTill.toString())
                let now = new Date()
                if (coupons[i].coupon.quota > 0) {
                    if (now < expDate) {
                        couponDetails.push(coupons[i].coupon)
                    }
                }
            }
            return res.send(couponDetails)
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send("An error has occurred | " + error)
    }
}

export default getAllCoupons
