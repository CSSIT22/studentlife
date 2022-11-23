import { Express, Request, Response } from "express"
import { nanoid } from "nanoid"
const addUserNotiObject = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        let noti_Object = await prisma.noti_Object.create({
            data: {
                notiObjectId: nanoid(),
                templateId: req.body.templateId,
                date: new Date(),
                isRead: false,
                moduleId: req.body.moduleId,
                url: req.body.url,
                values: req.body.values,
                // notiObjectId: "gasfd",
                // templateId: "111",
                // date: new Date("2022-01-10 09:00:00"),
                // isRead: false,
                // moduleId: "1",
                // url: "aaaaaa",
                // values: {
                //     create: {
                //         valueId: "lkfsjdf",
                //         value: "jvjndfjk",
                //     },
                // },
            },
        })
        res.send(noti_Object)
    } catch (err) {
        console.log
    }
}
export default addUserNotiObject
