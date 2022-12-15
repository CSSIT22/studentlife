import { Module, prisma } from "@prisma/client"
import { Express, Request, Response } from "express"
const getSenderImage = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const senderImage = await prisma.user_Profile.findFirstOrThrow({
            select: {
                image: true,
            },
            where: { userId: req.params.senderId },
        })
        // console.log(senderImage)

        return res.send(senderImage)
    } catch (err) {
        return res.status(400).send("There is an error finding user")
    }
}
export default getSenderImage
