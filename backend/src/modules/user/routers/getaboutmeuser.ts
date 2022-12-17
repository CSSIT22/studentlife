import { Request, Response } from "express"

const getaboutmeuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        // const tail = req.body
        const detail = await prisma.detail.upsert({
            where: {
                userId: userId,
            },
            update: {},
            create: {
                userId: userId || "",
                address: "",
                birth: "",
                hobby: "",
                phone: "",
                sex: "",
                year: 2000,
            },
        })
        res.json(detail)
    } catch (err) {
        res.status(400).send("Error find Aboutme")
    }
}

export default getaboutmeuser
