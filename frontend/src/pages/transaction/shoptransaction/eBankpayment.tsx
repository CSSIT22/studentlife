import React from "react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/shoptransaction/Header"
import { Button, Container, Link, Stack, Text } from "@chakra-ui/react"
import LogoBank from "src/components/transaction/logobank/LogoBank"
import Epayment from "src/components/transaction/methodpayment/Epayment"

const eBankpayment = () => {
    return (
        <div>
            <AppBody>
                <Header name="EBanking"></Header>

                <Container maxW="90%" my="10px" p={"20px"} bg="#fff2e5" color={"black"} borderRadius="10px" shadow={"lg"}>
                    <LogoBank banklogo="bank-icon bbl" />
                    <Epayment bank="Bangkok Bank" amount={100} payto="KMUTT Shop" paymentId="5136854961" product="Computer" />
                </Container>
                <Stack direction={"row"} justifyContent="center" gap={"3%"}>
                    <Link href="#">
                        <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg">
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Confirm
                            </Text>
                        </Button>
                    </Link>
                    <Link href="../shoptransaction">
                        <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Cancel
                            </Text>
                        </Button>
                    </Link>
                </Stack>
            </AppBody>
        </div>
    )
}

export default eBankpayment
