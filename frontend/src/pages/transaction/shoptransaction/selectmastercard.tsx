import { Container, Text, Show, Button, Center } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
import MasterCardInfo from "src/components/transaction/methodpayment/MasterCardInfo"
import Header from "src/components/transaction/shoptransaction/Header"
import { Link } from 'react-router-dom';

const selectmastercard = () => {
    return (
        <div>
            <AppBody>
                <Show below="md">
                    <Header name="MasterCard Selection"></Header>
                    <Container maxW="90%" my="24px" p={"1%"}>
                        <MasterCardInfo name="Dan Abrahmov" card={123456789} />
                        <MasterCardInfo name="Dan Abrahmov" card={123456789} />{" "}
                        <Link to="/transaction/shoptransaction/addcard">
                            <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="10px" shadow={"lg"}>
                                <Text fontSize="md" fontWeight={"bold"} color="white">
                                    Add a new MasterCard
                                </Text>
                            </Button>
                        </Link>
                    </Container>
                    {/* <Center gap={"30px"}>
                        <Link to="/transaction/shoptransaction/selectmethod">
                            <Button colorScheme="red" w={"100px"}>
                                Cancel
                            </Button>
                        </Link>

                        <Link to="/transaction/shoptransaction">
                            <Button colorScheme="green" w={"100px"}>
                                Save
                            </Button>
                        </Link>
                    </Center> */}
                </Show>
            </AppBody>
        </div>
    )
}

export default selectmastercard
