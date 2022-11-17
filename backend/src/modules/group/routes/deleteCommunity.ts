import { Request, Response } from "express"
import { Community, getCommunity, setCommunity } from "../testData"


const deleteCommunity = (req: Request, res: Response) =>{
        
        const reqCommunity = req.params.id
        let target: Community 

        const newdata = getCommunity().map((community) => {
            if (community.id == reqCommunity) {
                return null
                target = community
            }
            return community
        })

        setCommunity(newdata)

        res.send(target)
    }





export default deleteCommunity