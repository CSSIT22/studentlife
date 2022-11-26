import { Request, Response } from "express"
import { nanoid } from "nanoid"
const addNotiObject = async (req: Request, res: Response) => {
    const body = req.body
    //console.log(body)

    const objectId = nanoid()
    console.log(1234)

    try {
        const prisma = res.prisma
        const notiObject = await prisma.noti_Object.create({
            data: {
                notiObjectId: objectId,
                template: body.template, //enum ???
                date: new Date(),
                isRead: false,
                module: body.module, //enum ???
                url: body.url,
            },
        })
        console.log(1111)

        const data = req.body.value.map((item: string) => ({
            value: item,
            valueId: nanoid(),
            notiObjectId: objectId,
        }))
        console.log(222)

        const value = await prisma.value.createMany({
            data: data,
        })
        console.log(333)

        const user = req.body.userId.map((item: string) => ({
            userId: item,
            notiObjectId: objectId,
        }))

        console.log(user)

        const userNotiObject = await prisma.user_Noti_Object.createMany({
            data: user,
        })
        console.log(444)
        //console.log(body)
        return res.send(notiObject)
    } catch (err) {
        console.log(err)

        //console.log(body + " err" + err)
        return res.status(400).send(err)
    }
}
export default addNotiObject
