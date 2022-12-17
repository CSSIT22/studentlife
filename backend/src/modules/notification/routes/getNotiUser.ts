import { Request, Response } from "express"

const getNotiUser = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const notiUser = await prisma.noti_User.findFirstOrThrow({
            where: { userId: req.user?.userId },
            //where: { userId: "roLeb4f2ZTvMXyYm7-DIm" },
        })
        //console.log(req.user?.userId)
        return res.send(notiUser)
    } catch (err) {
        return res.status(400).send("user not found")
    }
}

export default getNotiUser
