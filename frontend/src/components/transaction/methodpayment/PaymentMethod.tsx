import { Box, Center, Container, Flex, Show, Spacer, Stack, Text, Button, Hide } from "@chakra-ui/react"
import React, { useState } from "react"
import MasterCardModal from "./MasterCard"

const PaymentMethod = () => {
    const [{ mastercard, qrcode }, setBtn] = useState({ mastercard: false, qrcode: false })

    return (
        <>
            {/* <Hide below="md"> */}
                <Container bg={"#e67f45"} maxW="90%" mt="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                    <Flex mb={"20px"} gap="20px" direction="row">
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Payment Method 
                        </Text>
                        {/* <Spacer /> */}
                        <Button colorScheme="whiteAlpha" shadow={"lg"} onClick={() => setBtn({ mastercard: true, qrcode: false })}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                MasterCard
                            </Text>
                        </Button>
                        <Button colorScheme="whiteAlpha" shadow={"lg"} onClick={() => setBtn({ mastercard: false, qrcode: true })}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                QRCODE
                            </Text>
                        </Button>
                    </Flex>

                    {mastercard ? <MasterCardModal></MasterCardModal> : <></>}
                    {qrcode ? (
                        <Text fontSize="lg" fontWeight={"bold"} color="white">
                            QR code
                        </Text>
                    ) : (
                        <></>
                    )}
                </Container>
            {/* </Hide> */}
        </>
    )
}

export default PaymentMethod
