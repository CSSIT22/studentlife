import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const showDetail = async (req: Request, res: Response) => {
    const resid = req.query.resId + ""
    const id = parseInt(req.query.id + "")
    const userId = req.user?.userId || ""
    var d = new Date();
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
                },userFav:{
                    where:{userId:userId}
                }
            },
        })

        res.send([restaurant])
    } catch (err) {
        console.log("Error")
        res.status(400)
    }
    // let selectedRes: Restaurant | null = null
    // getRestaurant().forEach((res) => {
    //     if (res.id == id) {
    //         selectedRes = res
    //     }
    // })
    // res.send([selectedRes])
}
export default showDetail
