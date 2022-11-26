import { Request, Response } from "express"
const getValue = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const value = await prisma.value.findMany({
            where: { notiObjectId: req.body.notiObjectId },
            // select:{value:true}
        })
        return res.send(value)
    } catch (err) {
        return res.status(400).send("NotiObject not found")
    }
}
export default getValue
