import { Container, Text, Show, Button, Link, Center } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
import BankButton from "src/components/transaction/methodpayment/BankButton"
import Header from "src/components/transaction/shoptransaction/Header"

const selectEbanking = () => {
    return (
        <div>
            <AppBody>
                <Show below="md">
                    <Header name="EBanking selection"></Header>
                    <Container maxW="90%" my="10px" p={"1%"}>
                        <BankButton bank={"Bangkok Bank"} link="#" />
                        <BankButton bank={"Kasikorn Bank"} link="#" />
                        <BankButton bank={"Krungthai Bank"} link="#" />
                        <BankButton bank={"Siam Commercial Bank"} link="#" />
                        <BankButton bank={"Krungsri Bank"} link="#" />
                    </Container>
                    <Center>
                        <Link href="selectmethod">
                            <Button colorScheme="red" w={"100px"}>
                                Back
                            </Button>
                        </Link>
                    </Center>
                </Show>
            </AppBody>
        </div>
    )
}

export default selectEbanking
