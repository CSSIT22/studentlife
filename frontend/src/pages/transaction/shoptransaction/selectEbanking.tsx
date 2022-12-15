import { Container, Text, Show, Button, Center } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
import BankButton from "src/components/transaction/methodpayment/BankButton"
import Header from "src/components/transaction/shoptransaction/Header"
import { Link } from 'react-router-dom';

const selectEbanking = () => {
    return (
        <div>
            <AppBody>
                <Show below="md">
                    <Header name="EBanking selection"></Header>
                    <Container maxW="90%" my="10px" p={"1%"}>
                        <BankButton bank={"Bangkok Bank"} link="/transaction/shoptransaction" />
                        <BankButton bank={"Kasikorn Bank"} link="/transaction/shoptransaction" />
                        <BankButton bank={"Krungthai Bank"} link="/transaction/shoptransaction" />
                        <BankButton bank={"Siam Commercial Bank"} link="/transaction/shoptransaction" />
                        <BankButton bank={"Krungsri Bank"} link="/transaction/shoptransaction" />
                    </Container>
                    <Center>
                        <Link to="/transaction/shoptransaction/selectmethod">
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
