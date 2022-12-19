import { User_Coupon } from "@prisma/client"
import { Request, Response } from "express"

const getAllUserCoupons = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        if (user != undefined){
            const userCoupons = await prisma.user_Coupon.findMany({where: {
                userId: user
            },
            include: {
                coupon: {
                  include: {
                    product: {
                        select: {
                            images: {select: {image: true}}
                        }
                    }
                  }
                }
            }
        })
        let couponDetails = []
        for (let i = 0; i < userCoupons.length; i++) {
            let expDate = new Date(userCoupons[i].coupon.validTill.toString())
            let now = new Date()
            if (userCoupons[i].coupon.quota > 0) {
                if (now < expDate) {
                    couponDetails.push(userCoupons[i])
                }
            }
        }
            return res.send(userCoupons)
        }
        return res.status(404).send("User not found!")
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default getAllUserCoupons