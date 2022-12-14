import { Request, Response } from "express"

const listNameFromId = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""

    const user = await prisma.user_Profile.findFirst({
        where: {
            userId: body.userId,
        },
    })
    return res.json(user)
}

export default listNameFromId
