import { Request, Response } from "express"

const getrestDbPls = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rest = await prisma.restaurant_Detail.findMany({
            include: {
                detailOf: {
                    select: {
                        openAt: {
                            select: {
                                open: true,
                            },
                        },
                        closeAt: {
                            select: {
                                close: true,
                            },
                        },
                        resName: true,
                        _count: {
                            select: {
                                reviews: true,
                            },
                        },
                        images: {
                            select: {
                                image: true,
                            },
                        },
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

export default getrestDbPls
