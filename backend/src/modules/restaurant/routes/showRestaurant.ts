import { Request, Response } from "express"
import axios from "axios"
const showRestaurant = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id + "")
    const radius = req.query.radius
  
  
   
    // console.log(radius);
    try{

    
    const google = axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=13.651215325557505,100.49407892842339&radius=${radius}&type=restaurant&key=AIzaSyApH4DrOZv8gyZjUEDWOy3wGDSxtGK6ypM`);
    // console.log((await google).data);
    // console.log(((await google).data.results).length);
    
    const show = (await google).data.results[id]
    // console.log(show.place_id);
    const detail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${show?.place_id}&key=AIzaSyApH4DrOZv8gyZjUEDWOy3wGDSxtGK6ypM`)
    // console.log(detail.data.result);
    // console.log(detail.data.result);
    
    const img = detail.data.result?.photos?.map((x:any) => {
        return {image: x.photo_reference} 
    })

    const showres = {resId: show.place_id, resName: show.name, images: img, likes: ((await google).data.results).length}
    
    
    // console.log([showres]);
    
    
    // const img = show?.photos.map((x:any) => {
    //     return [x.photo_reference]
    // })

    // const showres = Promise.all(show.map(async(x:any) => {

    //    return {placeId: x.place_id, name: x.name}
    // }))
  
    
    // const prisma = res.prisma
    // const selectRes = await prisma.restaurant.findFirstOrThrow({
    //     where: {
    //         resId: id
    //     },
    //     include:{
    //         images: true
    //     }
    // })
    
    res.send(showres)
}
catch(error) {
    res.status(400)
}

}
export default showRestaurant
