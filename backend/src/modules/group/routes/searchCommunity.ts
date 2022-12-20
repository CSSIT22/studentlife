import { Request, Response } from "express"

const searchCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const target = req.body.communityName

    try {
        const searchCommunity = await prisma.community.findMany({
            where: {
                communityName: { contains: target },
            },
        })

        res.status(302).json(searchCommunity)
    } catch (err) {
        
        res.status(404)
    }
}

export default searchCommunity
