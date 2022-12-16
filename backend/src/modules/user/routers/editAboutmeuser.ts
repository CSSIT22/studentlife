import { Request, Response } from "express"

const editaboutmeuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        const tail = req.body
        const upsertUser = await prisma.detail.upsert({
            where: {
                userId: userId,
            },
            update: {
                address: tail.address,
                birth: tail.birth,
                hobby: tail.hobby,
                phone: tail.phone,
                sex: tail.gender,
                year: tail.year,
            },
            create: {
                userId: userId || "",
                address: tail.address,
                birth: tail.birth,
                hobby: tail.hobby,
                phone: tail.phone,
                sex: tail.gender,
                year: tail.year,
            },
        })
        console.log(upsertUser)
        res.json(upsertUser)
    } catch (err) {
        res.json({ err })
    }
}

export default editaboutmeuser
