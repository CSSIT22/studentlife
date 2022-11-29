import { prisma } from "@prisma/client"
import { Express, Request, Response } from "express"

const readNotiObject = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const readObject = await prisma.user_Noti_Object.update({
            where: {
                notiObjectId_userId: {
                    notiObjectId: req.params.notiObjectId,
                    userId: req.user?.userId || "",
                },
            },
            data: {
                isRead: true,
            },
        })
        res.send(readObject)
    } catch (err) {
        return res.status(400).send("There is an error finding NotiObject")
    }
}
export default readNotiObject
