import { Request, Response } from "express"

const addQuote = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const id = req.params.id
    const user = req.user?.userId
    const quoteAdd = req.query.quoteAdd
    const quote = await prisma.chat_Quote.create({
        data : {
            roomId : id,
            userId : `${user}`,
            text : `${quoteAdd}`,
        },
    })
}

export default addQuote