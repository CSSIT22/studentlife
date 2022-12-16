import axios from "axios"
import { Request, Response } from "express"

const likedRestaurant = async (req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.params.id + ""
    const like = req.body.status

    // console.log(id);
    
    try {

        const detail = axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`)

        const detaildata = (await detail).data.result
        // console.log(detaildata);
        
        
        const prisma = res.prisma
        const existingRestaurant = await prisma.restaurant_Like_By_User.findFirst({
            where:{
                userId: user,
                resId: id
            }
        })
        if(existingRestaurant == null){
            const liked = await prisma.restaurant.create({
            
            data: {
                resId: id,
                resName: detaildata.name,
                likes: detaildata.user_ratings_total,
                lastupdated: new Date(),
                 detail: {
                    create: {
                     phoneNo: detaildata.formatted_phone_number,
                     website: detaildata.website,
                     location: detaildata.url,
                     vicinity: detaildata.vicinity,
                     latitude: detaildata.geometry.location.lat,
                     longitude: detaildata.geometry.location.lng,
                     zone: 13.651273593231576 < detaildata.geometry.location.lat ? "หน้ามอ" : "หลังมอ"
                }
                 },

                 openAt: {
                   create: {
                     open: detaildata.opening_hours.periods.open.time,
                     day: detaildata.opening_hours.periods.open.day
                   }
                 },
                userLike: {
                   create:  {
                    userId: user,
                    isLike: like,
                    updatedAt: new Date(),
                   }  
                  
                }
             
            }
        })
        if (existingRestaurant == null) {
            const liked = await prisma.restaurant_Like_By_User.create({
                data: {
                    userId: user,
                    resId: id,
                    isLike: like,
                    updatedAt: new Date(),
                },
            })
            //console.log(liked);

            res.send(liked)
        } else {
            const liked = await prisma.restaurant_Like_By_User.updateMany({
                where: {
                    userId: user,
                    resId: id,
                },
                data: {
                    isLike: like,
                    updatedAt: new Date(),
                },
            })
            res.send(liked)
        }
    }} catch (error) {
        console.log("Error")
    }
}
export default likedRestaurant
