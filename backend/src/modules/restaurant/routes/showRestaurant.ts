import { Request, Response } from "express"
import axios from "axios"
const showRestaurant = async(req: Request, res: Response) => {
    const id = req.params.id
  
   // axios.get()
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
