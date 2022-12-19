import React, { FC, useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/shoptransaction/Header"
import { Button, Center, Container, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import QRpayment from "src/components/transaction/methodpayment/QRpayment"
import QRcode from "src/components/transaction/methodpayment/QRcode"
import { Link, useLocation } from "react-router-dom"
import API from "src/function/API"

const qrpayment = ({ }) => {
    const totalPrice = useLocation().state.totalPrice
    const transactionId = useLocation().state.transactionId
    const [rawData, setRawData] = React.useState("")

    useEffect(() => {
        API.post("/transaction/QRpayment", {
            transactionid: transactionId,
            totalPrice: parseFloat(totalPrice),

        }).then(function (response) {
            setRawData(response.data.Qr)
        })
    }, [])

    // format number
    const numberFormat = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" })
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

    // Complete Transaction
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        if (showModal) {
            API.put("/transaction/updatestatus", {
                transactionid: transactionId,
            }).then(res => {
                const timer = setTimeout(() => {
                    setShowModal(false)
                    window.location.replace("/")
                }, 10000)
                return () => clearTimeout(timer)
            })
        }
    }, [showModal])

    const handleTransactionComplete = () => {
        setShowModal(true)
    }

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

                <Center>
                    <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg" mb={"10px"} onClick={handleTransactionComplete}>
                        Complete Transaction
                    </Button>
                </Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Transaction complete!</ModalHeader>
                        <ModalBody>The transaction was completed successfully.</ModalBody>
                        <ModalFooter>
                            <Link to={"/"}>
                                <Button onClick={() => setShowModal(false)}>Close</Button>
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </AppBody>
        </div>
    )
}

export default qrpayment
