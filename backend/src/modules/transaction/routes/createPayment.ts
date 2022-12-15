import axios from "axios"
import { randomUUID } from "crypto"
import { Request, Response } from "express"
import { customAlphabet, nanoid } from "nanoid"

const createPayment = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const body = req.body
        const nanoid = customAlphabet("1234567890", 10)
        const transId = nanoid().toUpperCase()
        const transaction = await prisma.transaction.create({
            data: {
                transId: transId,
                // userId: req.user?.userId || "",
                userId: "Wpj1j-ExAOjlYwApIodF8",
                totalPrice: body.totalPrice,
            },
        })
        axios
            .post(
                "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token",
                {
                    applicationKey: process.env.SCB_APPLICATION_ID,
                    applicationSecret: process.env.SCB_APPLICATION_SECRET,
                },
                {
                    headers: {
                        resourceOwnerId: process.env.SCB_RESOURCE_OWNER_ID,
                        requestUId: nanoid(),
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response.data)

                axios
                    .post(
                        "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create",
                        {
                            qrType: "PP",
                            ppType: "BILLERID",
                            ppId: process.env.SCB_MERCHANT_ID,
                            amount: transaction.totalPrice,
                            ref1: transId,
                            ref2: nanoid(),
                            ref3: "HCO",
                        },
                        {
                            headers: {
                                resourceOwnerId: process.env.SCB_RESOURCE_OWNER_ID,
                                requestUId: nanoid(),
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + response.data.data.accessToken,
                            },
                        }
                    )
                    .then(function (respone) {
                        return res.send({ Qr: respone.data.data.qrRawData })
                    })
                    .catch(function (error) {
                        console.log(error.response)
                    })
            })
            .catch(function (error) {
                console.log(error.response.data)
            })
    } catch (err) {
        console.log(err)
        return res.status(401).send("Couldn't make transaction due to some problem")
    }
}

export default createPayment
