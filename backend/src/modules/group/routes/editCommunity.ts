import { Request, Response } from "express"
import { Community, getCommunity, setCommunity } from "../testData"


const editCommunity = (req: Request, res: Response) =>{
        
        const reqCommunity = req.params
        let edit: Community 

        const newdata = getCommunity().map((community) => {
            if (community.id == reqCommunity.id) {
                edit =  { 
                            id: reqCommunity.id, 
                            name: reqCommunity.name,
                            owner: reqCommunity.owner,
                            desc: reqCommunity.desc,
                            privacy: reqCommunity.privacy,
                            coverPhoto: reqCommunity.coverPhoto
                        }

                return { 
                            id: reqCommunity.id, 
                            name: reqCommunity.name,
                            owner: reqCommunity.owner,
                            desc: reqCommunity.desc,
                            privacy: reqCommunity.privacy,
                            coverPhoto: reqCommunity.coverPhoto
                        }
            }
            return community
        })

        setCommunity(newdata)

        res.send(edit)
    }





export default editCommunity