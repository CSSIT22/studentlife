import { Request, Response } from "express"

const getQuote = async (req: Request, res: Response) => {
    try{
        const prisma = res.prisma
        const id = req.params.id
        const user = req.user?.userId
        const quote = await prisma.chat_Quote.findMany({
            select : {
                text : true
            },
            where : {
                roomId : id,
                userId : user,
            }
        })
        res.send(quote)
    } catch {
        res.status(400).send("Error can't find quote")
    }
}

export default getQuote