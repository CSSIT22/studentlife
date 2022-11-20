import { Express, Request, Response } from "express"
import { getObject } from ".."

const getUserNotiObject = async (req: Request, res: Response) => {
    try {
        // const prisma = res.prisma
        // const userNotiObject: any[] = await prisma.user_Noti_Object.findMany({
        //     where: {
        //         userId: req.params.id,
        //     },
        // })
        return res.send(getObject())
    } catch (err) {
        return res.status(400).send("There is an error finding userNotiObject")
    }
}
export default getUserNotiObject
