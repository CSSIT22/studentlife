import { Request, Response } from "express"
//import { rsn } from ".."

const getResentShortnotes = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const rsn: any = await prisma.sn_Recent.findMany({
            where: {
                userId: user,
            },
            select: {
                viewedAt: true,
                shortNote: true,
            },
            orderBy: { viewedAt: "desc" },
            take: 3,
        })
        //console.log(rsn)
        res.send(rsn)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getResentShortnotes
