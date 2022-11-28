import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."

const searchRestaurant = async(req: Request, res: Response) => {
    const name = req.query.name + ""

        const prisma = res.prisma
        const search = await prisma.restaurant.findMany({
           where: {
             resName: name
                
           }, 
           include: {
            detail: true,
            openAt: true,
            closeAt: true,
            images: true
           }
        })
        console.log(search);
        
        res.send(search)
  

    // getRestaurant().forEach((res) => {
    //     if (res.resName.substring(0, name.length).toLowerCase() == name.substring(0, name.length).toLowerCase()) {
    //         searchRes.push(res)
    //     }
    // })
}
export default searchRestaurant
