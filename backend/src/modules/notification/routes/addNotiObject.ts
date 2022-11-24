import { Request, Response } from "express"
import { nanoid } from "nanoid"
const addNotiObject = async (req: Request, res: Response) => {
    const body = req.body
    try {
        const prisma = res.prisma
        const notiObject = await prisma.noti_Object.create({
            data: {
                notiObjectId: nanoid(),
                template: body.template, //enum ???
                date: new Date(),
                isRead: false,
                module: body.module, //enum ???
                url: body.url,
            },
        })
        console.log(body)
        return res.send(notiObject)
    } catch (err) {
        console.log(body + " err" + err)
        return res.status(400).send(err)
    }
}
export default addNotiObject
