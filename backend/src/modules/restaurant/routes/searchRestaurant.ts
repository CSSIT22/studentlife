import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import axios from "axios";
import deleteFavorite from "./deleteFavorite";

const searchRestaurant = async (req: Request, res: Response) => {
    const name = req.query.name + ""
    var d = new Date()
    var dayNo = d.getDay()
    // console.log(name);
   
   
//  
   
    try {
        const prisma = res.prisma
        // let resData = <any>[]
       const search = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=13.651215325557505, 100.49407892842339&query=${name}&radius=0.1&type=restaurant&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`)
       .then((res) =>   {return (res.data.results)})
       console.log(search);
       


       
       const resdata = await Promise.all(search.map(async(x:any) => {
        const detail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${x.place_id}&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`)
        // const img = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${x.photos[0].photo_reference}&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`)
        // console.log(img.data);
        // console.log(detail);
        
       const detaildata = detail.data
    //   console.log(detaildata.result.formatted_phone_number);
      
        return (
            {placeId:x.place_id, name:x.name, photos:detaildata.result.photos[0].photo_reference, opening:detaildata.result.opening_hours, website:detaildata.result.website, phone: detaildata.result.formatted_phone_number}
            )
       }))

    //    console.log(resdata);
       
       
        // const search1 = await prisma.restaurant.findMany({
        
        //    where: {
        //      resName: {contains: name, mode: "insensitive"}
                
        //    }, 
        //    include: {
        //     detail: true,
        //     closeAt: {
        //         where: {
        //             day: dayNo,
        //         },
        //     },
        //     openAt: {
        //         where: {
        //             day: dayNo,
        //         },
        //     },
        //     images: true
        //    }
        // })
        res.send(resdata)
    }
    catch(error){
       
    }

    // getRestaurant().forEach((res) => {
    //     if (res.resName.substring(0, name.length).toLowerCase() == name.substring(0, name.length).toLowerCase()) {
    //         searchRes.push(res)
    //     }
    // })
}
export default searchRestaurant
