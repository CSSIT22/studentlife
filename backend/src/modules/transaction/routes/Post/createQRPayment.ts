import { Transaction_Detail } from "@prisma/client"
import axios from "axios"
import { Request, Response } from "express"
import { nanoid } from "nanoid"

const createQRPayment = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const body = req.body
        let reqUID = nanoid(10)
        // const userID = "Wpj1j-ExAOjlYwApIodF8"
        console.log(body)
        const createTransDetail: Transaction_Detail = await prisma.transaction_Detail.create({
            data: {
                transId: body.transactionid,
                transDesc: "QR Payment",
                transStatus: "Pending",
                isShip: false,
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
                        requestUId: reqUID,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response.data)
                console.log(createTransDetail)
                console.log(1111)

                const createQrBody = {
                    qrType: "PP",
                    ppType: "BILLERID",
                    ppId: process.env.SCB_MERCHANT_ID,
                    amount: body.totalPrice + "",
                    ref1: body.transactionid.toUpperCase().substring(0, 10),
                    ref2: "AAAAAAAAA120",
                    ref3: "HCO",
                }
                console.log(createQrBody)

                axios
                    .post("https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create", createQrBody, {
                        headers: {
                            resourceOwnerId: process.env.SCB_RESOURCE_OWNER_ID,
                            requestUId: reqUID,
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + response.data.data.accessToken,
                        },
                    })
                    .then(function (respone) {
                        console.log(respone.data)
                        return res.send({ Qr: respone.data.data.qrRawData })
                    })
                    .catch(function (error) {
                        console.log(error.response)
                    })
            })
            .catch(function (error) {
                console.log(error)

                console.log(error.response.data)
            })
    } catch (err) {
        console.log(err)
        return res.status(401).send("Couldn't make transaction due to some problem")
    }
}

export default createQRPayment
