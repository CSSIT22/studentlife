import { Button, Container, Hide, Input, InputGroup, InputLeftAddon, Link, Show, Stack, Text, useMediaQuery } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/shoptransaction/Header"

const addcard = () => {
    const [isSmallerThan630] = useMediaQuery("(max-width: 630px)")
    return (
        <div>
            <AppBody>
                <Header name="Adding a new card"></Header>
                <Container bg={"#e67f45"} color="white" maxW="90%" my="24px" borderRadius="10px" shadow={"lg"} py="23px">
                    <Text fontSize={isSmallerThan630 ? "lg" : "xl"} fontWeight={"bold"} mb="10px">
                        Card Details
                    </Text>
                    <Stack spacing={2}>
                        <InputGroup>
                            <InputLeftAddon
                                children="Name on Card"
                                fontSize={isSmallerThan630 ? "md" : "lg"}
                                fontWeight={"bold"}
                                color="black"
                                bg={"orange.50"}
                            ></InputLeftAddon>
                            <Input type="text" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon
                                children="Card Number"
                                fontSize={isSmallerThan630 ? "md" : "lg"}
                                fontWeight={"bold"}
                                color="black"
                                bg={"orange.50"}
                            ></InputLeftAddon>
                            <Input type="number" />
                        </InputGroup>
                        <Stack direction={isSmallerThan630 ? "column" : "row"}>
                            <InputGroup>
                                <InputLeftAddon
                                    children="Expiry Date"
                                    fontSize={isSmallerThan630 ? "md" : "lg"}
                                    fontWeight={"bold"}
                                    color="black"
                                    bg={"orange.50"}
                                ></InputLeftAddon>
                                <Input type="year" placeholder="MM/YY" _placeholder={{ color: "white" }} />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon
                                    children="CVV"
                                    fontSize={isSmallerThan630 ? "md" : "lg"}
                                    fontWeight={"bold"}
                                    color="black"
                                    bg={"orange.50"}
                                ></InputLeftAddon>
                                <Input type="number" />
                            </InputGroup>
                        </Stack>
                    </Stack>
                </Container>
                <Stack direction={"row"} justifyContent="center" gap={"3%"}>
                    <Show below="md">
                        <Link href="selectmastercard">
                            <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                                <Text fontSize={isSmallerThan630 ? "md" : "lg"} fontWeight={"bold"}>
                                    Cancel
                                </Text>
                            </Button>
                        </Link>
                    </Show>

                    <Hide below="md">
                        <Link href="../shoptransaction">
                            <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                                <Text fontSize={isSmallerThan630 ? "md" : "lg"} fontWeight={"bold"}>
                                    Cancle
                                </Text>
                            </Button>
                        </Link>
                    </Hide>

                    <Link href="../shoptransaction">
                        <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg">
                            <Text fontSize={isSmallerThan630 ? "md" : "lg"} fontWeight={"bold"}>
                                Save
                            </Text>
                        </Button>
                    </Link>
                </Stack>
            </AppBody>
        </div>
    )
}

export default addcard
