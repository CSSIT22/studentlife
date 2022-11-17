import { Request, Response } from "express"
import { Community, getCommunity } from "../testData"


const searchCommunity = (req: Request, res: Response) =>{
    
    const id = req.params.id
        let target: Community 

        getCommunity().forEach((community) => {
            if(community.id == id){
                target = community
            }
        })

        if(target != null){
            return res.send(target)
        }
        
        return res.status(404).send("Community not found")
    }





export default searchCommunity