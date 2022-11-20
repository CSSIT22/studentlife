import { Request, Response } from "express"
// import { InitUser } from "@apiType/user/InitUser"
import { InitUserResponse } from "@apiType/user"
const init = async (req: Request, res: Response<InitUserResponse | string>) => {
    try {
        const { prisma } = res
        const { userId, email, fName, lName, levels, studentId, roles } = await prisma.user_Profile.findFirstOrThrow({
            where: { userId: req.user?.userId },
            include: { levels: true, roles: { select: { role: true } } },
        })
        return res.json({
            userId,
            email,
            fName,
            lName,
            levels,
            studentId,
            roles: [...roles.map((item: any) => item.role)],
        })
    } catch (err) {
        return res.status(500).send("User not found")
    }
}

// export default init
