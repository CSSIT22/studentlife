import { Request, Response } from "express"

const deleteMember = async(req: Request, res: Response) =>{
    
    const prisma = res.prisma
    const userid = req.body.userId
    const community = req.body.communityID


    try{
        await prisma.community_User.delete({
            where:{
                //userId_communityId:userid
            }
        })

        res.status(200).send("Delete Success")
    }
    catch(err){
        res.status(404)
    }
}



export default deleteMember