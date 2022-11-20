import { Request, Response } from "express"
import { getCard, UserCC } from ".."

const getUserCard = (req: Request, res: Response) => {
    const Id = req.params.Id
    let selectedUser: UserCC | null = null
    getCard().forEach((card: any) => {
        if (card.userId == Id) {
            selectedUser = card
        }
    })
    if (selectedUser != null) {
        return res.status(400).send("Credit Card Token not found")
    }
    return res.send(selectedUser)
}

export default getUserCard
