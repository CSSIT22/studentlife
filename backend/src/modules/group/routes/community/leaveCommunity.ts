import { Request, Response } from "express"

const leaveCommuntiy = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const userid = req.user?.userId

    try{
        await prisma.community_User.delete({
            where:{
                //communityId:req.body.communityId
                //userId : userid
            }
        })

        res.status(200).send("Leave Success")
    }
    catch(err){
        res.status(403)
    }
}



export default leaveCommuntiy