import { Request, Response } from "express"

const getMember = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const id = req.params.id

        const member = await prisma.user_To_Room.findMany({
            where: {
                roomId: id,
            },
            include: {
                user: {
                    select: {
                        fName: true,
                        image: true,
                    },
                },
            },
        })
        res.send(member)
    } catch {
        res.status(400).send("Error can't find member")
    }
}

export default getMember
