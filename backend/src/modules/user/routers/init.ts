import { Request, Response } from "express"
// import { InitUser } from "@apiType/user/InitUser"
import { InitUserResponse } from "@apiType/user"
import { sign } from "jsonwebtoken"
const init = async (req: Request, res: Response<InitUserResponse | string>) => {
    try {
        const { prisma } = res
        const { userId, email, fName, lName, levels, studentId, roles } = await prisma.user_Profile.findFirstOrThrow({
            where: { userId: req.user?.userId },
            include: { levels: true, roles: { select: { role: true } } },
        })
        const socketToken = sign({ userId: req.user?.userId }, process.env.COOKIE_SECRET || "")
        return res.json({
            userId,
            email,
            fName,
            lName,
            levels,
            studentId,
            roles: [...roles.map((item: any) => item.role)],
            socketToken,
        })
    } catch (err) {
        return res.status(500).send("User not found")
    }
}

export default init
