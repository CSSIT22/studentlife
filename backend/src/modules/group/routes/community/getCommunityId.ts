import { Request, Response } from "express"

const getCommunityId = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id

    try{
        const communityById = await prisma.community.findUnique({
            where:{
                communityId:id
            },
        })

        console.log("communityById")
        res.send(communityById)
    }catch(err){
        console.log(err)
        res.status(400)
    }
}


export default getCommunityId