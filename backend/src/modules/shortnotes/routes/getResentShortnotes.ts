import { Request, Response } from "express"
//import { rsn } from ".."

const getResentShortnotes = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const user = req.user?.userId

    const rsn: any = await prisma.sn_Recent.findMany({
        where: {
            userId: user,
        },
        orderBy: { viewedAt: "asc" },
        take: 3,
    })
    //console.log(rsn)

    const idList = rsn.map((item: any) => {
        return item.snId
    })
    //console.log(idList)

    const newRsn: any = await prisma.sn_Head.findMany({
        where: {
            snId: { in: idList },
        },
    })

    //console.log(newRsn)
    res.send(newRsn)
}

export default getResentShortnotes
