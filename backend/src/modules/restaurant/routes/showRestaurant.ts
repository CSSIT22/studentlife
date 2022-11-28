import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const showRestaurant = async(req: Request, res: Response) => {
    const id = req.params.id
  
    
try {
    const prisma = res.prisma
    const selectRes = await prisma.restaurant.findFirstOrThrow({
        where: {
            resId: id
        },
        include:{
            images: true
        }
    })
    
    res.send([selectRes])
} catch (error) {
    console.log("Show Error");
    
}
}
export default showRestaurant
