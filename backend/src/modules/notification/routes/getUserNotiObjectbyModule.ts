import { Module, prisma } from "@prisma/client"
import { Express, Request, Response } from "express"
import { trusted } from "mongoose"
import { getObject } from ".."

const getUserNotiObjectbyModule = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        if (req.params.module == "All" || "") {
            const userNotiObject = await prisma.user_Noti_Object.findMany({
                where: { userId: req.user?.userId },
                include: { notiObject: true },
            })
            //console.log(userNotiObject)
            return res.send(userNotiObject)
        } else {
            const userNotiObject = await prisma.user_Noti_Object.findMany({
                where: {
                    userId: req.user?.userId,
                    AND: {
                        notiObject: {
                            module: req.params.module as Module,
                        },
                    },
                },
                include: { notiObject: true },
            })
            //console.log(userNotiObject)
            return res.send(userNotiObject)
        }
    } catch (err) {
        //console.log(err)

        return res.status(400).send("There is an error finding userNotiObject")
    }
}
export default getUserNotiObjectbyModule
