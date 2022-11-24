import React from "react"
import { Button, Center, Collapse, Container, Link, Show, Text } from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import Header from "../../components/transaction/shoptransaction/Header"
import PaymentHistory from "src/components/transaction/paymentHistory/PaymentHistory"

const historyTransaction = () => {
    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)

    return (
        <AppBody>
            <Header name="My Purchase" />


            <Container bg={"#e67f45"} color="white" maxW="90%" my="24px" borderRadius="10px" shadow={"lg"} py="23px">
                <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight={"bold"} mb="10px">
                    Latest Transaction
                </Text>
                <PaymentHistory transID="1234567890" date="02/12/22 11:20 pm" />
                <PaymentHistory transID="1234567890" date="02/12/22 11:20 pm" />
                <PaymentHistory transID="1234567890" date="02/12/22 11:20 pm" />
                <Collapse in={show}>
                    <PaymentHistory transID="1234567890" date="02/12/22 11:20 pm" />
                    <PaymentHistory transID="1234567890" date="02/12/22 11:20 pm" />
                </Collapse>
                <Center>
                    <Button size="md" onClick={handleToggle} mt="1rem" colorScheme={"gray"} color="black">
                        Show {show ? "Less" : "More"}
                    </Button>
                </Center>

            </Container>
            <Center>
                <Link href="#">
                    <Show below="md">
                        <Button colorScheme="red" w={"100px"} >
                            Back
                        </Button>
                    </Show>

                </Link>
            </Center>
        </AppBody>
    )
}

export default historyTransaction
