import { Box, Center, Container, Flex, Show, Spacer, Stack, Text, Button, Hide } from "@chakra-ui/react"
import React, { useState } from "react"
import EbankModal from "./Ebank"
import MasterCardModal from "./MasterCard"
import { Link } from "react-router-dom"

const PaymentMethod = () => {
    // const [mastercard, setMethod] = React.useState([]);

    const [{ mastercard, ebanking, qrcode }, setBtn] = useState({ mastercard: false, ebanking: false, qrcode: false })
    // onClick={() => setBtn({ mastercard: true, ebanking: false, qrcode: false })}

    return (
        <>
            <Show below="md">
                {/* <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                    <Flex>
                        <Center>
                            <Stack direction={"column"}>
                                <Text fontSize="md" fontWeight={"bold"}>
                                    Total payment 123,123
                                </Text>
                                <Text fontSize="md" fontWeight={"bold"}>
                                    Payment Method: ....
                                </Text>
                            </Stack>
                        </Center>
                        <Spacer />
                        <Center>
                            <Box>
                                <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                    <Link to="/transaction/shoptransaction/selectmethod">
                                        <Text fontSize="sm" fontWeight={"bold"} color="black">
                                            Select Method
                                        </Text>
                                    </Link>
                                </Button>
                            </Box>
                        </Center>
                    </Flex>
                </Container> */}
            </Show>

            <Hide below="md">
                <Container bg={"#e67f45"} maxW="90%" mt="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                    <Flex mb={"20px"}>
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Payment Method
                        </Text>
                        <Spacer />
                        <Button colorScheme="whiteAlpha" shadow={"lg"} onClick={() => setBtn({ mastercard: true, ebanking: false, qrcode: false })}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                MasterCard
                            </Text>
                        </Button>

                        <Spacer />
                        <Button onClick={() => setBtn({ mastercard: false, ebanking: true, qrcode: false })} colorScheme="whiteAlpha" shadow={"lg"}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                Ebanking
                            </Text>
                        </Button>
                        <Spacer />
                        <Button colorScheme="whiteAlpha" shadow={"lg"} onClick={() => setBtn({ mastercard: false, ebanking: false, qrcode: true })}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                QRCODE
                            </Text>
                        </Button>
                    </Flex>

                    {mastercard ? <MasterCardModal></MasterCardModal> : <></>}
                    {ebanking ? <EbankModal></EbankModal> : <></>}
                    {qrcode ? (
                        <Text fontSize="lg" fontWeight={"bold"} color="white">
                            QR code
                        </Text>
                    ) : (
                        <></>
                    )}
                </Container>
            </Hide>
        </>
    )
}

export default PaymentMethod
