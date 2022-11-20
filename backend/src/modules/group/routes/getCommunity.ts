import { Request, Response } from "express"



const getCommunity = async (req: Request, res: Response) =>{
        
        const prisma = res.prisma
        const userid = req.user?.userId
        

        try{
            const communityUser = await prisma.community_User.findMany(   
                {
                    select:{
                        communityId:true
                    },
                    where :{
                        userId : userid
                    }
                }
            )

            const commuinities = await prisma.community.findMany(   
                {
                    select:{
                        communityId:true
                    },
                    where :{
                        communityId : {in : communityUser.map((item:any) => item.communityId)
                        }
                    }
                }
            )

        
        res.status(200).json(commuinities)
        }

        catch(err){
            res.status(404)
        }
        
    }





export default getCommunity