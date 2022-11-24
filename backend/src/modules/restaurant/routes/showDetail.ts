import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
import { prisma } from "@prisma/client"
const showDetail = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: id+""},
                // include: {  restaurant_Detail   : true,
                //             restaurant_Open     : true,
                //             restaurant_Close    : true,
                //             restaurant_Image    : true,
                //         }
        })
        
        res.send( restaurant) 
    } catch (err) {
        
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