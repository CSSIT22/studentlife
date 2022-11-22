import { Request, Response } from "express"

const getLibrary = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const li: any = await prisma.sn_Library.findMany({
            select: {
                libId: true,
                libName: true,
                shortNotes: {
                    select: {
                        sn: true,
                    },
                },
            },
            where: {
                userId: req.body.user,
            },
        })
        //console.log(li)
        console.log(li)

        res.send(li)
    } catch (err) {
        res.status(400).send("some error")
    }
}

export default getLibrary
