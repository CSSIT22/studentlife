import { Request, Response } from "express"

const getshopImage = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const image = await prisma.sReview_Shop_Image.findMany({})
        res.send(image)
    } catch {
        res.status(400).send("Error can't find image")
    }
}

export default getshopImage
