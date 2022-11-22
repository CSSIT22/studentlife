import { Request, Response } from "express"

const getFile = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    try {
        const communityFile = await prisma.community_File.findMany({
            select: {
                fileId: true,
            },
            where: {
                communityId: body.communityId,
            },
        })

        res.status(200).json(communityFile)
    } catch (err) {
        res.status(404)
    }
}

export default getFile
