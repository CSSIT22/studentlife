import express from "express"
import { verifyUser } from "./../backendService/middleware/verifyUser"
import getUserCard from "./routes/getUserCard"

const transactionRoutes = express()
transactionRoutes.use(express.json())

export type order = {
    orderId: string
}

export type payment_type = "PURCHASE" | "TRANSFER"

export type payMethod_id = "QR" | "EBANKING" | "MASTERCARD"

export type Transaction = {
    userId: string
    payMethod_Id: payMethod_id
    payment_Type: payment_type
    order: order
    point_use: number
}

export type CreditCard = {
    CC_name: string
    CC_id: string
    exp_month: number
    exp_year: number
    country: string
    cvc: number
}

export type UserCC = {
    userId: string
    card: CreditCard
}

export let transactions: Transaction[] = [
    {
        userId: "1234",
        payMethod_Id: "QR",
        payment_Type: "PURCHASE",
        order: {
            orderId: "asdf",
        },
        point_use: 10,
    },
]

export let ucc_card: UserCC[] = [
    {
        userId: "1234",
        card: {
            CC_name: "Joseph Jostar",
            CC_id: "123456789123",
            exp_month: 12,
            exp_year: 2565,
            country: "Thailand",
            cvc: 253,
        },
    },
    {
        userId: "1232",
        card: {
            CC_name: "Joseph Jostar",
            CC_id: "123456789124",
            exp_month: 12,
            exp_year: 2565,
            country: "Thailand",
            cvc: 254,
        },
    },
    {
        userId: "1233",
        card: {
            CC_name: "Jotaro Jostar",
            CC_id: "123456789123",
            exp_month: 12,
            exp_year: 2565,
            country: "Thailand",
            cvc: 269,
        },
    },
]

// export const getOrder = () => transactions

// export const setOrder = (newData: Transaction[]) => {
//     transactions = newData
// }

export const getCard = () => ucc_card

// export const addCard = (newCard: UserCC[]) => {
//     ucc_card = newCard
// }

transactionRoutes.get("/getUserCard/", getUserCard)

export default transactionRoutes
