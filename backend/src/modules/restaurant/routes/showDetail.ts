import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const showDetail = async (req: Request, res: Response) => {
    const id = req.params.id
    var d = new Date();
    var dayNo = d.getDay()
    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: id },
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
            },
        })
        
    res.send([restaurant])
    } catch (err) {
        console.log("Error");
        
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
