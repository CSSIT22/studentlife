import { Request, Response } from "express"

const getPic = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const id = req.params.id
    try {
        const community = await prisma.community
            .findFirstOrThrow({
                select: {
                    communityPhoto: true,
                },
                where: {
                    communityId: id,
                },
            })
            .then((result) => {
                res.end(result.communityPhoto)
            })
            .catch((err) => {
                console.log("no community found")
            })
    } catch (err) {
        res.status(500).send(err)
    }
}

export default getPic
