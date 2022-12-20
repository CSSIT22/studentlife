import { Request, Response } from "express"

const setRole = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    const roleSet: any = {
        roleId: body.roleId,
    }

    try {
        await prisma.community_User.update({
            where: {
                userId_communityId: {
                    userId: req.body.userId,
                    communityId: req.body.communityId,
                },
            },
            data: roleSet,
        })
        res.send(req.body)
        res.send("test")
        res.status(200).send("Set role success")
    } catch (err) {
        
        res.status(404)
    }
}

export default setRole
