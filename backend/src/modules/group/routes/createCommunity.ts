import { Request, Response } from "express"
import { Community } from "@apiType/group"
import Communities, { getCommunity, setCommunity } from "../testData"


const createCommunity = (req: Request, res: Response) =>{
        
        const reqCommunity = req.params

        setCommunity([
            { 
                id: reqCommunity.id, 
                name: reqCommunity.name,
                owner: reqCommunity.owner,
                desc: reqCommunity.desc,
                privacy: reqCommunity.privacy,
                coverPhoto: reqCommunity.coverPhoto
            
            },...Communities]);

            let newCommunity: Community 

        res.send(newCommunity)
    }





export default createCommunity