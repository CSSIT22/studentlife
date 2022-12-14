import e, { Request, Response } from "express"

const getMember = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const id = req.params.id

        const member = await prisma.user_To_Room.findMany({
            select:{
                user:{
                    select:{
                        userId :true,
                        image:true,
                        fName:true,
                        lName:true,
                    }
                }
            },
            where:{
                roomId : id
            }
        })
        res.send(member)
    } catch {
        res.status(400).send("Error can't find member")
    }
}

export default getMember
