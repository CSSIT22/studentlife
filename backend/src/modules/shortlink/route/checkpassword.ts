import { Request, Response } from "express"

const checkpassword = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const password = req.body.data.password
        const shortlink = req.body.data.shorten
        const result = await prisma.shortLink.findFirstOrThrow({
            where: {
                shortenLink: shortlink,
                password: password,
            }
        })
        res.json({link: result.originalLink})
    } catch (err: any) {
        console.log(err)
        res.status(404).json({err: err, message: "link not found or incorrect password"})
    }
}

export default checkpassword