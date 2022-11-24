import { prisma } from "@prisma/client"
import { Express, Request, Response } from "express"
import { trusted } from "mongoose"
import { getObject } from ".."

const getUserNotiObject = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const userNotiObject = await prisma.user_Noti_Object.findMany({
            where: { userId: req.user?.userId },
            select: { notiObjectId: true },
        })
        //console.log(req.user?.userId)
        //return res.send(userNotiObject)
        return res.send(getObject())
    } catch (err) {
        return res.status(400).send("There is an error finding userNotiObject")
    }
}
export default getUserNotiObject
