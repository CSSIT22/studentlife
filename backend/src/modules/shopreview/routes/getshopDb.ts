import { Request, Response } from "express"

const getshopDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const shop = await prisma.sReview_Shop.findMany({
            include: {
                // reviews: {
                //     select: {
                //         rating: true,
                //     },
                // },
                images: {
                    select: {
                        image: true,
                    },
                },
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
        const sr = await prisma.sReview_Review.groupBy({
            by: ["shopId"],
            _avg: {
                rating: true,
            },
        })
        // console.log(sr)

        const response = shop.map((item) => ({ ...item, rating: sr.filter((i) => i.shopId === item.shopId)[0]._avg.rating || 0 }))

        res.send(response)
        // res.send(shop.map((e) => e.images))
    } catch {
        res.status(400).send("Error can't find shop")
    }
}

export default getshopDb
