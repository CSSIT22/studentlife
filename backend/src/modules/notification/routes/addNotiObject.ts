import { Request, Response } from "express"
import { nanoid } from "nanoid"
import { pushNotiType } from "@apiType/notification"
import { Module, Noti_Type, Template } from "@prisma/client"

import { Server } from "socket.io"
import nodemailer from "nodemailer"
import { getSessionIdsByUserIds } from "../../backendService/socketstore/store"
import { showDescription } from "../utils/replaceValue"

let transporter = nodemailer.createTransport({
    host: "mail.bsthun.com",
    port: 587,
    secure: false,
    auth: {
        user: "noreply@modlifes.me",
        pass: "VkFTfHLgYS56m00ojNUvxbUfKG8P4207",
    },
})
const addNotiObject = async (req: Request, res: Response) => {
    const body = req.body as pushNotiType
    const objectId = nanoid()

    try {
        const prisma = res.prisma
        const notiObject = await prisma.noti_Object.create({
            data: {
                notiObjectId: objectId,
                template: body.template as Template,
                date: new Date(),
                module: body.module as Module,
                url: body.url || "",
                userId: body.sender || "",
            },
        })
        //console.log(1111)

        const data = req.body.value.map((item: string) => ({
            value: item,
            valueId: nanoid(),
            notiObjectId: objectId,
        }))
        //console.log(222)

        const value = await prisma.value.createMany({
            data: data,
        })
        //console.log(333)

        const user = req.body.userId.map((item: string) => ({
            userId: item,
            isRead: false,
            notiObjectId: objectId,
        }))

        //console.log(user)

        for (const userId of req.body.userId) {
            try {
                await prisma.noti_User.findFirstOrThrow({
                    where: { userId: userId },
                })
                //console.log(userId + "exist")
            } catch (err) {
                await prisma.noti_User.create({
                    data: {
                        userId: userId,
                        notiSettingEmail: "ALL",
                        notiSettingApp: "ALL",
                    },
                })
                //console.log(userId + "created")
            }
        }

        const userNotiObject = await prisma.user_Noti_Object.createMany({
            data: user,
        })

        setTimeout(async () => {
            // body.userId.forEach((el) => {
            for (let i in body.userId) {
                const el = body.userId[i]
                let socketids = getSessionIdsByUserIds(el)
                console.log(socketids)

                for (let id of socketids) {
                    ;(res.io as Server).to(id).emit("push_noti", { data, notiObject })
                }
                try {
                    const userEmail = await prisma.noti_User.findFirstOrThrow({
                        where: {
                            notiSettingEmail: "ALL" as Noti_Type,
                            userId: el,
                        },
                        include: {
                            user: {
                                select: { email: true },
                            },
                        },
                    })

                    let info = await transporter.sendMail({
                        from: "ModLifes <noreply@modlifes.me>",
                        to: userEmail.user.email,
                        subject: "notification from " + notiObject.module,
                        html: showDescription(req.body.value, notiObject.template),
                    })
                } catch (err) {}
            }
        }, 1000)

        return res.send(notiObject)
    } catch (err) {
        //console.log(err)

        console.log(body + " err" + err)
        return res.status(400).send(err)
    }
}
export default addNotiObject
