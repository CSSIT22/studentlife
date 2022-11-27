import { Request, Response } from "express"
import { getRestaurant } from ".."
import { Restaurant } from "@apiType/restaurant"
const updateRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const prisma = res.prisma
        const update = await prisma.restaurant_Image.update({
            where: {imageId: 3},
            data:{
                image: "https://images.otstatic.com/prod1/42062542/3/huge.jpg"
            }
                
        })
        
    res.send(update)
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
export default updateRestaurant