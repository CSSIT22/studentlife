import { Request, Response } from "express"

const getAboutMeDetail = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user ? req.user.userId : ""
        const aboutMeData = await prisma.detail.findUniqueOrThrow({
            where: {
                userId: userId,
            },
        })
        res.status(200).json({aboutMeData: aboutMeData})
    } catch (err) {
        console.error(err)
        res.status(400).json({message_error: err})
    }
}

export default getAboutMeDetail
