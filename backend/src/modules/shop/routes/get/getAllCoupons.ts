import { Shop_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const getAllCoupons = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const coupons: Shop_Coupon[] = await prisma.shop_Coupon.findMany({
            include: {
                product: {
                    select: {
                        images: {select: {image: true}}
                    }
                }
            }
        })
        let couponDetails = []
        for (let i = 0; i < coupons.length; i++) {
            let expDate = new Date(coupons[i].validTill.toString())
            let now = new Date()
            if (coupons[i].quota > 0) {
                if (now < expDate) {
                    couponDetails.push(coupons[i])
                }
            }
        }
        return res.send(couponDetails)
    } catch (error) {
        return res.status(404).send("An error has occurred | " + error)
    }
}

export default getAllCoupons
