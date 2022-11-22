import { Contact } from "@apiType/shop"
import { Request, Response } from "express"
import { getContacts } from "../dummyData/contacts"

const getContactInfo = async (req: Request, res: Response) => {
    try {
        let contactId = req.params.id
        let selectedContact: Contact | null = null
        selectedContact = getContacts().filter((c) => c.contactId.toString() == contactId)[0]
        return res.send(selectedContact)
    } catch (error) {
        return res.status(404).send("Cannot get the contact information")
    }
}

export default getContactInfo
