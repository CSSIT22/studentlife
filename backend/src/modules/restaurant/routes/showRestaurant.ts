import { Request, Response } from "express"
import axios from "axios"
const showRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id
    let x;
   const google = axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=13.651271797671654,100.49196241529494&radius=1000&type=restaurant&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8");
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
    // console.log((await google).data);
    
    res.send([selectRes])
} catch (error) {
    console.log("Show Error");
    
}
}
export default showRestaurant
