import { Express, Request, Response } from "express"
import { getObject, setObject } from "../index"
import { Notiobject } from "@apiType/notification"
import { Module } from "@prisma/client"

const readNotiObject = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        if (req.params.module == "All") {
            const readObject = await prisma.user_Noti_Object.updateMany({
                where: {
                    userId: req.user?.userId || "",
                },
                data: {
                    isRead: true,
                },
            })
        } else {
            const readObject = await prisma.user_Noti_Object.updateMany({
                where: {
                    userId: req.user?.userId || "",
                    AND: {
                        notiObject: { module: req.params.module as Module },
                    },
                },
                data: {
                    isRead: true,
                },
            })
        }
    } catch (err) {
        return res.status(400).send("error")
    }
}
export default readNotiObject
