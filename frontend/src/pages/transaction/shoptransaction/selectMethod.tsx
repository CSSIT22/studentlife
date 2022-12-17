import { Container, Text, Show, Button, Center } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/shoptransaction/Header"
import { Link } from 'react-router-dom';

const selectmethod = () => {
    // const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <div>
            <AppBody>
                <Show below="md">
                    <Header name="Payment Method"></Header>

                    <Container maxW="90%" my="24px" p={"1%"}>
                        <Link to="/transaction/shoptransaction/selectmastercard">
                            <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="20px" h={"50px"} shadow={"lg"}>
                                <Text fontSize="md" fontWeight={"bold"} color="white">
                                    MasterCard
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/transaction/shoptransaction/selectEbanking">
                            <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="20px" h={"50px"} shadow={"lg"}>
                                <Text fontSize="md" fontWeight={"bold"} color="white">
                                    EBanking
                                </Text>
                            </Button>
                        </Link>
                        <Link to="/transaction/shoptransaction">
                            <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="20px" h={"50px"} shadow={"lg"}>
                                <Text fontSize="md" fontWeight={"bold"} color="white">
                                    QRcode
                                </Text>
                            </Button>
                        </Link>
                    </Container>
                    <Center>
                        <Link to="/transaction/shoptransaction">
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

export default selectmethod
