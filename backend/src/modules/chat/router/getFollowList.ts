import { Request, Response } from "express"

const followList = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const followList = await prisma.follow.findMany({
            select : {
                following : {
                    select : {
                        userId : true,
                        image : true,
                        fName : true,
                    }
                }
            },
            where : {
                userId : user
            }
        })
        res.send(followList)
    } catch {
        res.status(400).send("Error can't find follow list")
    }
}

export default followList
