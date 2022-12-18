import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const showDetail = async (req: Request, res: Response) => {
    const resid = req.query.resId + ""
    const userId = req.user?.userId || ""
    var d = new Date()
    var dayNo = d.getDay()
    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: resid },
            include: {
                detail: true,
                images: true,
                closeAt: {
                    where: {
                        day: dayNo,
                    },
                },
                openAt: {
                    where: {
                        day: dayNo,
                    },
                },
                userFav: {
                    where: { userId: userId },
                },
            },
        })

        res.send([restaurant])
    } catch (err) {
        console.log("Error")
        res.status(400)
    }
}
export default showDetail
