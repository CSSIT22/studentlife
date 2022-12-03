import { Request, Response } from "express"

const leaveCommuntiy = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userid = req.user?.userId
    const target = req.params.id

    try {
        await prisma.community_User.deleteMany({
            where: {
                    userId: userid,
                    communityId: target
                },
        })

        res.status(200).send("Leave Success")
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}

export default leaveCommuntiy
