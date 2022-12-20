import { Request, Response } from "express"
//import { rsn } from ".."

const getExtraRsn = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const rsn: any = await prisma.sn_Recent.findMany({
            where: {
                userId: user,
            },
            select: {
                viewedAt: true,
                shortNote: {
                    include:{
                        course: true,
                    }
                },
                
            },
            orderBy: { viewedAt: "desc" },
            distinct: "snId",
        })
        res.send(rsn)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getExtraRsn
