import { Request, Response } from "express"
import { customAlphabet } from "nanoid"
const customlink = async (req: Request, res: Response) => {
    const body = req.body
    const userId = req.user?.userId || ""
    console.log(req.body.originalLink)
    console.log(req.body.shortenLink)
    const userids: string[] = req.body.userAccessIds || []

    // console.log(req.body.shortenlink)
    // console.log(req.user)

    try {
        const prisma = res.prisma
        const result = await prisma.shortLink.create({
            data: {
                userId: userId,
                originalLink: body.originalLink,
                shortenLink: body.shortenLink,
                userAccess: {
                    createMany: {
                        data: [...userids.map((item) => ({ userId: item }))],
                    },
                },
            },
        })
        console.log(result)
        res.status(200).json({ result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", err: err })
    }
}
export default customlink
