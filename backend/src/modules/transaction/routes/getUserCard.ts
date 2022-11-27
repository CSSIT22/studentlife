// import { Request, Response } from "express"

// import { reqCCuser } from "@apiType/transaction/transaction"

// const getUserCard = (req: Request, res: Response) => {
//     const Id = req.params.Id
//     let selectedUser: reqCCuser | null = null
//     getCard().forEach((card: any) => {
//         if (card.userId == Id) {
//             selectedUser = card
//         }
//     })
//     if (selectedUser != null) {
//         return res.send(selectedUser)
//     }

//     return res.status(400).send("Credit Card Token not found")
// }

// export default getUserCard
