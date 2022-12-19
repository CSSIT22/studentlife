import { Noti_Type } from "@prisma/client"
import { Request, Response } from "express"

const editNotiUserSetting = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const notiUser = await prisma.noti_User.update({
            where: { userId: req.params.userId },
            data: {
                notiSettingApp: req.params.app as Noti_Type,
                notiSettingEmail: req.params.email as Noti_Type,
            },
        })
        //console.log(req.user?.userId)
        return res.send(notiUser)
    } catch (err) {
        //console.log(err)
        //console.log(req.user?.userId)
        //console.log(req.user?.userId)
        return res.status(400).send("user not found")
    }
}

export default editNotiUserSetting
