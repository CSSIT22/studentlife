import axios from "axios"
import { Request, Response } from "express"

const likedRestaurant = async (req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.body.id + ""
    const like = req.body.status

    // console.log(id);
   try{



// const addHours = (date: Date): Date => {
//     const result = new Date(date);
//     result.setHours(result.getHours() + 7);
//     return result;
//   };
 
        const detail = axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?&place_id=${id}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`
        )
        
        const detaildata = (await detail).data.result
        //  console.log(detaildata);
        // console.log(detaildata.geometry.location.lng > 13.651273593231576  ? (detaildata.geometry.location.lng >  13.666273593231576 ? "อื่นๆ" : "หน้ามอ"): (detaildata.geometry.location.lng <  13.636273593231576 ? "อื่นๆ" : "หลังมอ"));
        // console.log(detaildata.opening_hours.periods[0].open.time);
       
        const opentime = detaildata?.opening_hours?.periods.map((x: any) => {
            // console.log(x);

            return { day: x?.open?.day == undefined ? 0 : x?.open?.day, open: x?.open?.time == undefined ? "undefined" : x?.open?.time}
        })

        // console.log(detaildata.opening_hours?.period);
        
    
        const closetime = detaildata?.opening_hours?.periods.map((x: any) => {
            // console.log(x);
            
            return ({ day: x?.close?.day == undefined ? 0 : x?.close?.day, close: x?.close?.time == undefined ? "undefined" : x?.close?.time})
        })

        // console.log(closetime);
        
        // console.log(detaildata.photos)
        let img;

        if(detaildata?.photos == undefined) {
          img = {image: "undefined"}
        }
        else{
            img = detaildata?.photos.map((x:any) => {
                return {image: x.photo_reference}
            })
        }
       
        // console.log(img);
        
        const prisma = res.prisma
        const existingRestaurant = await prisma.restaurant.findFirst({
            where: {
                resId: id
            },
        })
        // console.log("problem "+!existingRestaurant + " d");
        
        if (existingRestaurant == null) {
            const liked = await prisma.restaurant.create({
                data: {
                    resId: id,
                    resName: detaildata.name,
                    likes: detaildata.user_ratings_total,
                    lastupdated:new Date(),
                    detail: {
                        create: {
                            phoneNo: detaildata.formatted_phone_number,
                            website: detaildata.website,
                            location: detaildata.url,
                            vicinity: detaildata.vicinity,
                            latitude: detaildata.geometry.location.lat,
                            longitude: detaildata.geometry.location.lng,
                            zone:
                                detaildata.geometry.location.lng > 100.49407892842339
                                    ? detaildata.geometry.location.lng > 100.50907892842339
                                        ? "อื่นๆ"
                                        : "หน้ามอ"
                                    : detaildata.geometry.location.lng < 100.47907892842339
                                    ? "อื่นๆ"
                                    : "หลังมอ",
                        },
                    },

                    openAt: {
                        createMany: {
                            data:opentime == undefined ? {day: 0, open: "undefined"} : opentime
                        }
                    },
                    closeAt: {
                        createMany: {
                            data:closetime == undefined ? {day: 0, close: "undefined"} : closetime
                        }
                    },
                    images: {
                        createMany: {
                            data: img
                        }
                    }
                },
            })
            res.send(liked)
        }

        // hhhhhhhhhhhh
        const checkLike = await prisma.restaurant_Like_By_User.findFirst({
            where: {
                userId: user,
                resId: id
            },
        })
        if(checkLike == null){
            const liked = await prisma.restaurant_Like_By_User.create({
               data: {
                userId: user,
                resId: id,
                isLike: like,
                updatedAt:  new Date(),
               }
            })
            res.send(liked)
        }
         else {
                const liked = await prisma.restaurant_Like_By_User.updateMany({
                    where: {
                        userId: user,
                        resId: id,
                    },
                    data: {
                        isLike: like,
                        updatedAt:  new Date(),
                    },
                })
                res.send(liked)
            }

        }
        catch(error) {
           res.status(400)
        }
           
        
   
}
export default likedRestaurant
