// import axios from "axios";
// import { Request, Response } from "express";

// const addRestaurant = async (req: Request, res: Response) => {
//     const placeid = req.params.placeid
//     try {
//        const detail = axios.get(`https://maps.googleapis.com/maps/api/place/details/json
//         ?&place_id=${placeid}
//         &key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`)
//         console.log((await detail).data);
        
//         const prisma = res.prisma
//     } catch (error) {
//         res.status(400)
//     }
    
// }
// export default addRestaurant
