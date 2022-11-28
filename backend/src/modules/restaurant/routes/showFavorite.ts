import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."
const showFavorite = async(req: Request, res: Response) => {
    const user = req.user?.userId || ""
    try {
        const prisma = res.prisma
        const fav = await prisma.restaurant.findMany({
            include:{
                
                
            }

        })
        res.send(fav)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}
export default showFavorite