import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const deleteFavorite = async(req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.body.id
    const prisma = res.prisma
    try {
        const deletefav = await prisma.restaurant_Favorite_By_User.deleteMany({
            where: {
              userId: user,
              resId: id
            },
           
        })
        console.log(deletefav);
        res.send(deletefav)

        
    } catch (error) {
      
        res.status(400)
    }
    // const newdata = getRestaurant().map((restaurant) => {
    //     if (restaurant.id == id) {
    //         restaurant.isFavorite = false
    //         deleteRes = restaurant
            
    //     }
    //     return restaurant
    // })
  
    
}
export default deleteFavorite
