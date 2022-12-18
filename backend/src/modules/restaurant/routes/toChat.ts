import { Request, Response } from "express"

const toChat = async (req: Request, res: Response) => {
    const resid = req.params.resId

    try {
        const prisma = res.prisma
        const restaurant = await prisma.restaurant.findUnique({
            where: { resId: resid },
            include: {
                detail: { select: { website:true,
                                    vicinity:true }},
                images: true,
            },
        })

        res.send([restaurant])
    } catch (err) {
        console.log("Error")
        res.status(400)
    }
}
export default toChat
