import { Request, Response } from "express"

const getAvgshopDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const rate = req.query.rating
        var numCount = 0
        var numCount2 = 0
        var numCount3 = 0
        var numCount4 = 0
        var numCount5 = 0
        var numCount6 = 0
        var sumRating = 0
        var Avg = 0
        const Rates = await prisma.sReview_Review.findMany({
            select: {
                rating: true,
            },
            where: {
                shopId: id,
            },
        })
        Rates.map((item: any) => {
            if (item.rating === 5) {
                numCount += 1
                sumRating += 5
            } else if (item.rating === 4) {
                sumRating += 4
                numCount2 += 1
            } else if (item.rating === 3) {
                numCount3 += 1
                sumRating += 3
            } else if (item.rating === 2) {
                numCount4 += 1
                sumRating += 2
            } else if (item.rating === 1) {
                numCount5 += 1
                sumRating += 1
            } else if (item.rating === 0) {
                numCount6 += 1
            }
            let summ = numCount + numCount2 + numCount3 + numCount4 + numCount5 + numCount6
            Avg = sumRating / summ
        }),
            console.log(Avg)
        const Av = {
            Avg: Avg,
        }

        res.send(Av)
        // res.send(shop.map((e) => e.images))
    } catch {
        res.status(400).send("Error can't find shop")
    }
}

export default getAvgshopDb
