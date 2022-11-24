import { Request, Response } from "express"
import { nanoid } from "nanoid"
const addValue = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const value = await prisma.value.create({
            data: {
                // valueId: nanoid(),
                // value: req.body.value,
                // notiObjectId: "???", //FK??

                valueId: nanoid(),
                value: "09:00 PM",
                notiObjectId: "U6Gtq1uC9jz-1kShVUlep", //FK??
            },
        })
        return res.send(value)
    } catch (err) {
        return res.status(400).send(err)
    }
}
export default addValue
