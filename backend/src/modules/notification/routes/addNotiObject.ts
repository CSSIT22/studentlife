import { Request, Response } from "express"
import { nanoid } from "nanoid"
const addNotiObject = async (req: Request, res: Response) => {
    const body = req.body
    const objectId = nanoid()

    try {
        const prisma = res.prisma
        const notiObject = await prisma.noti_Object.create({
            data: {
                notiObjectId: objectId,
                template: body.template,
                date: new Date(),
                module: body.module,
                url: body.url,
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
        return res.send(notiObject)
    } catch (err) {
        //console.log(err)

        //console.log(body + " err" + err)
        return res.status(400).send(err)
    }
}
export default addNotiObject
