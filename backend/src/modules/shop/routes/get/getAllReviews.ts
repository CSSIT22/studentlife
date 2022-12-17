import { Shop_Product_Review, User_Profile } from "@prisma/client"
import { Request, Response } from "express"

const getAllReviews = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        let pId = req.params.productId
        let filteredReviews: Shop_Product_Review[] | null = await prisma.shop_Product_Review.findMany({
            include: {
                user: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                    },
                },
            },
            where: { productId: parseInt(pId) },
        })
        if (filteredReviews.length == 0) {
            return res.status(404).send("No review Found")
        }
        // return res.send(await prisma.user_Profile.findMany())
        return res.send(filteredReviews)
    } catch (error) {
        return res.status(404).send("No review Found")
    }
}

export default getAllReviews
