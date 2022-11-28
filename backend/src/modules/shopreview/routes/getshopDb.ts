import { Request, Response } from "express"

const getshopDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const prisma = res.prisma
        const shop = await prisma.sReview_Shop.findMany({
            include: {
                images: {
                    select: {
                        image: true,
                    },
                },
            },
            where: {
                shopId: id,
            },
        })
        res.send(shop)
        // res.send(shop.map((e) => e.images))
    } catch {
        res.status(400).send("Error can't find room")
    }
}

export default getshopDb
