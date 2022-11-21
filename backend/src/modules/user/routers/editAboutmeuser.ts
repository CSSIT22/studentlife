import { Request, Response } from "express"

const getaboutmeuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId
        const tail = req.body
        const upsertUser = await prisma.detail.upsert({
            where: { userId },
            update: {
                phone: tail.phone,
                birth: tail.birth,
                sex: tail.sex,
                hobby: tail.hobby,
                year: tail.year,
            },
            create: {
                phone: tail.phone,
                birth: tail.birth,
                sex: tail.sex,
                hobby: tail.hobby,
                year: tail.year,
            },
        })

        // const detail = await prisma.detail.findFirstOrThrow({
        //     where: { userId },
        //     select: { phone: true, birth: true, sex: true, hobby: true, year: true },
        // })
        res.json(upsertUser)
    } catch (err) {
        res.status(400).send("Error find Aboutme")
    }
}

export default getaboutmeuser
