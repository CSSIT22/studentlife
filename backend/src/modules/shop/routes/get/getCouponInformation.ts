import { Shop_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const getCouponInformation = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
            const couponDetails : Shop_Coupon | null = await prisma.shop_Coupon.findUnique({where: {
                couponCode: req.params.couponCode
            }
        })
        return res.send(couponDetails)
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default getCouponInformation