import { Restaurant } from "@apiType/restaurant"
import { prisma } from "@prisma/client"
import { Request, Response } from "express"
import { getRestaurant, setRestaurant } from ".."

const likedRestaurant = async(req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.params.id
    const like = req.body.status
    try {
        const prisma = res.prisma
        const existingRestaurant = await prisma.restaurant_Like_By_User.findFirst({
            where:{
                userId: user,
                resId: id
            }
        })
        if(existingRestaurant == null){
            const liked = await prisma.restaurant_Like_By_User.create({
            data: {
                userId: user,
                resId: id,
                isLike: like,
                updatedAt: new Date(),
            }
        })
        //console.log(liked);
        
        res.send(liked)
        }else{
            const liked = await prisma.restaurant_Like_By_User.updateMany({
                where:{
                    userId: user,
                    resId: id,
                    
                },
                data:{
                    isLike: like,
                    updatedAt: new Date(),
                }
            })
            res.send(liked)
        }
        
    } catch (error) {
        console.log("Error");
        
    }
 
}
export default likedRestaurant
