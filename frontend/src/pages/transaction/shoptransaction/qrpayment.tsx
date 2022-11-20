import React from "react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/shoptransaction/Header"
import { Button, Container, Link, Stack, Text } from "@chakra-ui/react"
import QRpayment from "src/components/transaction/methodpayment/QRpayment"
import QRcode from "src/components/transaction/methodpayment/QRcode"

const qrpayment = () => {
    return (
        <div>
            <AppBody>
                <Header name="QRCode"></Header>

                <Container maxW="90%" my="10px" p={"20px"} bg="#fff2e5" color={"black"} borderRadius="10px" shadow={"lg"}>
                    <QRpayment total="50,000.00" paywithin="60 sec" />
                </Container>

                <Container maxW="90%" my="20px" p={"20px"} bg="#fff2e5" color={"black"} borderRadius="10px" shadow={"lg"}>
                    <QRcode qrurl="https://img.freepik.com/premium-vector/qr-code-sample-smartphone-scanning-qr-code-icon-flat-design-stock-vector-illustration_550395-108.jpg?w=2000" />
                </Container>
                <Stack direction={"row"} justifyContent="center" gap={"3%"}>
                    <Link href="../shoptransaction">
                        <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Back
                            </Text>
                        </Button>
                    </Link>
                </Stack>
            </AppBody>
        </div>
    )
}

export default qrpayment
