import { Request, Response } from "express"
import { rsn } from ".."

const getResentShortnotes = async (req: Request, res: Response) => {
    // const prisma = res.prisma
    // const user = req.user?.userId
    // const rsn:any = await prisma.sn_Recent.findMany({
    //     include:{
    //         userId: user,
    //     },
    // })
    // console.log(rsn)
    res.send(rsn)
}

export default getResentShortnotes
