import { Request, Response } from "express"
import axios from "axios"
const showRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id
   const google = axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=13.651215325557505,100.49407892842339&radius=1000&type=restaurant&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8");
//   console.log((await google).data)
  
   
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
