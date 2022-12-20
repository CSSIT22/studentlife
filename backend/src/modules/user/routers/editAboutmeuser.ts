import { Request, Response } from "express"
import { Prisma } from "@prisma/client"

const editaboutmeuser = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.user?.userId || ""
        const tail = req.body
        console.log(userId)
        const upsertUser = await prisma.detail.upsert({
            where: {
                userId: userId,
            },
            update: {
                address: tail.address,
                birth: new Date(tail.birth).toISOString(),
                hobby: tail.hobby,
                phone: tail.phone,
                sex: tail.gender,
            },
            create: {
                userId: userId || "",
                address: tail.address,
                birth: new Date(tail.birth).toISOString(),
                hobby: tail.hobby,
                phone: tail.phone,
                sex: tail.gender,
            },
        })
        res.json(upsertUser)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                console.log("There is a unique constraint violation, a new user cannot be created with this email")
            }
        }
        res.json({ err })
    }
}

export default editaboutmeuser
