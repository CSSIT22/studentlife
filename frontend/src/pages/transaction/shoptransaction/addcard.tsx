import { Button, Container, Input, InputGroup, InputLeftAddon, Stack, Text } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/Header"

const addcard = () => {
    return (
        <div>
            <AppBody />
            <Header header="Adding a new card"></Header>
            <Container bg={"orange.400"} color="white" maxW="65%" my="24px" borderRadius="10px" shadow={"lg"} py="23px">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Card Details
                </Text>
                <Stack spacing={2}>
                    <InputGroup>
                        <InputLeftAddon children="Name on Card" fontSize="lg" fontWeight={"bold"} color="black" bg={"orange.50"}></InputLeftAddon>
                        <Input type="text" placeholder="Card name" _placeholder={{ color: "white" }} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon children="Card Number" fontSize="lg" fontWeight={"bold"} color="black" bg={"orange.50"}></InputLeftAddon>
                        <Input type="number" placeholder="Your card number" _placeholder={{ color: "white" }} />
                    </InputGroup>
                    <Stack direction={"row"}>
                        <InputGroup>
                            <InputLeftAddon children="Expiry Date" fontSize="lg" fontWeight={"bold"} color="black" bg={"orange.50"}></InputLeftAddon>
                            <Input type="year" placeholder="MM/YY" _placeholder={{ color: "white" }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children="CVV" fontSize="lg" fontWeight={"bold"} color="black" bg={"orange.50"}></InputLeftAddon>
                            <Input type="number" placeholder="CVV" _placeholder={{ color: "white" }} />
                        </InputGroup>
                    </Stack>
                </Stack>
            </Container>
            <Stack direction={"row"} justifyContent="center" gap={"3%"}>
                <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                    <Text fontSize="lg" fontWeight={"bold"}>
                        Cancle
                    </Text>
                </Button>
                <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg">
                    <Text fontSize="lg" fontWeight={"bold"}>
                        Comfilm
                    </Text>
                </Button>
            </Stack>
        </div>
    )
}

export default addcard
