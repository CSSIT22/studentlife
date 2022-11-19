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
                        <BankButton bank={"Bankok Bank"} />
                        <BankButton bank={"Kasikorn Bank"} />
                        <BankButton bank={"Krungthai Bank"} />
                        <BankButton bank={"Siam Commercial Bank"} />

                        <BankButton bank={"Krungsri Bank"} />
                        <BankButton bank={"Bank of Ayudhya"} />
                        <BankButton bank={"TTB"} />
                    </Container>
                    <Center gap={"30px"}>
                        <Link href="selectmethod">
                            <Button colorScheme="red" w={"100px"}>
                                Cancel
                            </Button>
                        </Link>

                        <Link href="../shoptransaction">
                            <Button colorScheme="green" w={"100px"}>
                                Save
                            </Button>
                        </Link>
                    </Center>
                </Show>
            </AppBody>
        </div>
    )
}

export default selectEbanking
