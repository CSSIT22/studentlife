import { Request, Response } from "express"
const addNotiUser = async (req: Request<string | null>, res: Response) => {
    try {
        const prisma = res.prisma
        const notiUser = await prisma.noti_User.create({
            data: {
                userId: req.user?.userId || "", //from userProfile
                notiSettingEmail: "ALL",
                notiSettingApp: "ALL",
                // userId: "roLeb4f2ZTvMXyYm7-DIm", //from userProfile
                // notiSettingEmail: "ALL",
                // notiSettingApp: "ALL",
            },
        })
        return res.send(notiUser)
    } catch (err) {
        return res.status(400).send(err)
    }
}
export default addNotiUser
