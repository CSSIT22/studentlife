import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."
const showFavorite = async(req: Request, res: Response) => {
    const user = req.params.user
    try{
        const prisma = res.prisma
        const fav = await prisma.restaurant.findMany({
            // where: {
            //     userId: user,
            // },
            include: {
                detail: true,
                userFav: true,

            }
        })

        // const detail = await prisma.restaurant_Detail.findMany({
        //     where: {
        //     //    resId: fav
                
        //     }
        // })
        res.send("ss")
    } catch(err){

    }
}
export default showFavorite