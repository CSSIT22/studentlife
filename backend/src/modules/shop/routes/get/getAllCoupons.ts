import { User_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const getAllCoupons = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const userid = req.user?.userId
        if (userid != undefined) {
            const coupons: User_Coupon[] = await prisma.user_Coupon.findMany({ where: { userId: userid } })
            let couponDetails = []
            for (let i = 0; i < coupons.length; i++) {
                let couponD = await prisma.shop_Coupon.findUnique({ where: {couponCode: coupons[i].couponCode} })
                couponDetails.push(couponD)
            }
            // Add function to check coupon validity -> Expiriry date, quota, etc
            return res.send(couponDetails)
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send("An error has occurred | " + error)
    }
}

export default getAllCoupons
