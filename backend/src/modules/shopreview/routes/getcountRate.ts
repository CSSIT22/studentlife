import { Request, Response } from "express"

const getcountRate = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const count = await prisma.sReview_Shop.findMany({
            select: {
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
            where: {
                shopId: id,
            },
        })
        res.send(count)
    } catch {
        res.status(400).send("Error can't count rate")
    }
}

export default getcountRate
