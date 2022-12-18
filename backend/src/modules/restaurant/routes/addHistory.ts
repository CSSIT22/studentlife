import { Request, Response } from "express"

const addHistory = async (req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const resid = req.params.id

const addHours = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(result.getHours() + 7);
    return result;
  };
    try {
        const prisma = res.prisma
        const seen = await prisma.restaurant_Seen_By_User.create({
            
            data: {
                userId: user,
                resId: resid,
                seenAt: addHours(new Date()),
            },
        })

        // const isSeen = await prisma.restaurant.update({
        //     where: {
        //         resId: resid
        //     },
        //     data:{
        //      isSeen: true
        //     }
        // })

        // console.log(isSeen);
        res.send(seen)
    } catch (error) {
        console.log("Error store")
        res.status(400)
    }
}

export default addHistory
