import { Request, Response } from "express"

const getrestDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rest = await prisma.restaurant.findMany({
            include: {
                detail: {
                    select: {
                        zone: true,
                        location: true,
                        phoneNo: true,
                    },
                },
                images: true,
                openAt: true,
                closeAt: true,
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
            where: {
                resId: id,
            },
        })
        const rv = await prisma.sReview_Review.groupBy({
            by: ["resId"],
            _avg: {
                rating: true,
            },
        })
        console.log(rv)
        const resp = rest.map((item) => ({ ...item, rating: rv.filter((i) => i.resId === item.resId)[0]?._avg?.rating || 0 }))
        console.log(resp)
        res.send(resp)
    } catch (err) {
        console.log(err)
        res.status(400).send("Error can't find restaurant")
    }
}

export default getrestDb
