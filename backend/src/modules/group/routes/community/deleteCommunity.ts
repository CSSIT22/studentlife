import { Request, Response } from "express"

const deleteCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const target = req.params.id

    try {
        await prisma.community.delete({
            where: {
                communityId: target,
            },
            include: {
                tags: true,
                member:true,
                blacklist:true,
                posts:true,
                files:true
            }
        })

        res.status(200).send("Delete Success")
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default deleteCommunity
