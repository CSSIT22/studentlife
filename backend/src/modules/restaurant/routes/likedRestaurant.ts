import { Restaurant } from "@apiType/restaurant"
import { prisma } from "@prisma/client"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const likedRestaurant = async(req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.params.id

    try {
        const prisma = res.prisma
        const liked = await prisma.restaurant_Like_By_User.create({
            data: {
                userId: user,
                resId: id
            }
        })
        // const newdata = getRestaurant().map((restaurant) => {
        //  if(restaurant.id == id){
        //         restaurant.status = true
        //         likeOrNot = restaurant
        //  }
        //  return restaurant
        // })
        // setRestaurant(newdata)
        console.log(liked);
        
        res.send(liked)
    } catch (error) {
        console.log("Error");
        
    }
 
}
export default likedRestaurant
