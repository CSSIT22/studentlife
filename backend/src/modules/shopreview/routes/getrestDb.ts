import { Request, Response } from "express"

const getrestDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rest = await prisma.restaurant.findMany({
            include: {
                images: {
                    select: {
                        image: true,
                    },
                },
                detail: {
                    select: {
                        // zone: true,
                    },
                },
            },
            where: {
                resId: id,
            },
        })
        res.send(rest)
    } catch {
        res.status(400).send("Error can't find restaurant")
    }
}

export default getrestDb
