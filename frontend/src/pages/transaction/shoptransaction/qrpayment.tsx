import React, { FC, useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/shoptransaction/Header"
import { Button, Container, Stack, Text } from "@chakra-ui/react"
import QRpayment from "src/components/transaction/methodpayment/QRpayment"
import QRcode from "src/components/transaction/methodpayment/QRcode"
import { Link, useLocation } from 'react-router-dom';
import API from "src/function/API"

const qrpayment = ({ }) => {
    const totalPrice = useLocation().state.totalPrice
    const transactionId = useLocation().state.transactionId
    const [rawData, setRawData] = React.useState("")

    useEffect(() => {
        API.post("http://localhost:8000/transaction/QRpayment", {
            transactionid: transactionId,
            totalPrice: parseFloat(totalPrice),
        }).then(function (response) {
            setRawData(response.data.Qr)
        })
    }, [])

    // format number
    const numberFormat = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })
    const formattedNumberTotalPrice = numberFormat.format(totalPrice)

    // time left
    const [timeLeft, setTimeLeft] = useState(120)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
            if (timeLeft === 1) {
                window.location.replace("/shop/cart")
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [timeLeft])

    return (
        <div>
            <AppBody>
                <Header name="QRCode" />

                <Container maxW="90%" my="10px" p={"20px"} bg="#fff2e5" color={"black"} borderRadius="10px" shadow={"lg"}>
                    <QRpayment total={formattedNumberTotalPrice} paywithin={timeLeft} />
                </Container>

                <Container maxW="90%" my="20px" p={"20px"} bg="#fff2e5" color={"black"} borderRadius="10px" shadow={"lg"}>
                    <QRcode qrurl={"https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=" + rawData} />
                </Container>
            </AppBody>
        </div>
    )
}

export default qrpayment
