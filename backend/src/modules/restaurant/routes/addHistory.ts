import { Request, Response } from "express"

const addHistory = async (req:Request, res:Response) => {
    const user = req.user?.userId || ""
    const resid = req.params.id
    try {
        
        const prisma = res.prisma
        const seen = await prisma.restaurant_Seen_By_User.create({
            data: {
                userId: user,
                resId: resid,
                seenAt: new Date()
            }
        })

        const isSeen = await prisma.restaurant.update({
            where: {
                resId: resid
            }, 
            data:{
             isSeen: true
            }
        })
    
        // console.log(isSeen);
        console.log(seen);
        res.send(seen)
    } catch (error) {
        console.log("Error store");
        
    }
}

export default addHistory