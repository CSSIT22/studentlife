import { Noti_Type } from "@prisma/client"
import { Request, Response } from "express"

const editNotiUserSeting = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const notiUser = await prisma.noti_User.update({
            where: { userId: req.user?.userId },
            data: {
                notiSettingApp: req.params.settingApp as Noti_Type,
                notiSettingEmail: req.params.settingEmail as Noti_Type,
            },
        })
        //console.log(req.user?.userId)
        return res.send(notiUser)
    } catch (err) {
        return res.status(400).send("user not found")
    }
}

export default editNotiUserSeting
