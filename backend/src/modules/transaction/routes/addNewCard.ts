import { Request, Response } from "express"
import { prisma } from "@prisma/client"
import { nanoid } from "nanoid"

const addNewCard = async (req: Request<any | string>, res: Response) => {
    try {
        const prisma = res.prisma
        const body = req.body
        const crId = nanoid()
        const card = await prisma.credit_Card.create({
            data: {
                crId: crId,
                userId: body.userId,
                ccId: body.ccId,
                bank: body.bank,
                cardExpired: body.cardExpired,
                country: body.country,
                cvc: body.cvc,
                holderName: body.holderName,
                last4: body.last4,
            },
        })
        return res.send(card)
    } catch (err) {
        console.log(err)
        return res.status(401).send("Couldn't add new card")
    }
}

export default addNewCard
