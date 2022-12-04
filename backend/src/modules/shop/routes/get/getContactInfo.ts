import { Shop_Contact } from "@prisma/client"
import { Request, Response } from "express"

const getContactInfo = async (req: Request, res: Response) => {
    const contactId = req.params.id
    const prisma = res.prisma
    try {
        const result: Shop_Contact | null = await prisma.shop_Contact.findUnique({
            where: { contactId: parseInt(contactId) },
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("Error! Could not find the contacts")
    }
}

export default getContactInfo
