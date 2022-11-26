import { Request, Response } from "express"
import { nanoid } from "nanoid"
const addUserNotiObject = async (req: Request, res: Response) => {
    const body = req.body
    try {
        const prisma = res.prisma
        const userNotiObject = await prisma.user_Noti_Object.create({
            data: {
                userId: "", //FK
                notiObjectId: "", //FK

                //userId: "roLeb4f2ZTvMXyYm7-DIm", //FK
                //notiObjectId: "pqx9kmYcZSXZD98FE0WjT", //FK
            },
        })
        return res.send(userNotiObject)
    } catch (err) {
        return res.status(400).send(err)
    }
}
export default addUserNotiObject
