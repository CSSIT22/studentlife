import { Request, Response } from "express"

const setRole = async(req: Request, res: Response) =>{
        
    const prisma = res.prisma
    const body = req.body


    const roleSet : any = {
        userId : body.userId,
        roleId : body.roleId,
    }
    
    try{
        await prisma.community_User.update({  
            where:{
                //userId:req.body.userId
            },
            data:roleSet
        })
    }
    catch{
        res.status(404)
    }
}




export default setRole