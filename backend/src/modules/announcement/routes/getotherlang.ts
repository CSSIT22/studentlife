import { Request, Response } from "express"

const getOtherLang = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        const lang = await prisma.announcement_Language.findMany({
            select: {
                languageId: true,
                language: true,
            },
        })
        res.send(lang)
    } catch (err) {
        res.status(404).send("Other lang not found")
    }
}

export default getOtherLang
