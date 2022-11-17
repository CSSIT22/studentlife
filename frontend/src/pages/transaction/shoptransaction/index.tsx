import { Text, Container, Box, Stack, Button, Link, Center, useMediaQuery, Hide, Show, Flex, Spacer } from "@chakra-ui/react"
import React from "react"
import UsePoint from "src/components/transaction/shoptransaction/UsePoint"
import Userinfo from "src/components/transaction/shoptransaction/Userinfo"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/shoptransaction/Header"
import OrderList from "../../../components/transaction/shoptransaction/OrderList"

const shopTransaction = () => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <AppBody>
            <Header name="CHECKOUT" />

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"1%"} borderRadius="10px" shadow={"lg"}>
                <Stack direction={isSmallerThan768 ? "column" : "row"} justifyContent={"center"}>
                    <Userinfo id="123456789" email="mail123@kmutt.ac.th" />
                    <UsePoint point={123} />
                </Stack>
            </Container>

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"1%"} borderRadius="10px" shadow={"lg"} color="white">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Order List
                </Text>
                <Stack direction={isSmallerThan768 ? "row" : "column"}>
                    <OrderList
                        imageAlt=""
                        imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
                        product="Smartwatch"
                        quantity={1}
                        price={"21,244.00"}
                    />
                    <OrderList
                        imageAlt=""
                        imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        product="polaroid"
                        quantity={1}
                        price={"11,259.78"}
                    />
                </Stack>
            </Container>

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"1%"} borderRadius="10px" shadow={"lg"} color="white">
                <Show below="md">
                    <Flex>
                        <Stack direction={"column"}>
                            <Text fontSize="md" fontWeight={"bold"}>
                                Total payment 123,123
                            </Text>
                            <Text fontSize="md" fontWeight={"bold"}>
                                Payment Method: ....
                            </Text>
                        </Stack>
                        <Spacer />
                        <Box>
                            <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                <Link href="shoptransaction/selectmethod" target="_parent" color="black">
                                    <Text fontSize="sm" fontWeight={"bold"}>
                                        Select Method
                                    </Text>
                                </Link>
                            </Button>
                        </Box>
                    </Flex>
                </Show>
                <Hide below="md">
                    <Flex>
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"}>
                            Payment Method
                        </Text>
                        <Spacer />
                        <Stack direction="row" gap="20px">
                            <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                <Link href="shoptransaction/masterCard" target="_parent" color="black">
                                    <Text fontSize="lg" fontWeight={"bold"}>
                                        MasterCard
                                    </Text>
                                </Link>
                            </Button>
                            <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                <Link href="shoptransaction/eBanking" target="_parent" color="black">
                                    <Text fontSize="lg" fontWeight={"bold"}>
                                        Ebanking
                                    </Text>
                                </Link>
                            </Button>
                            <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                <Link href="shoptransaction/qrCode" target="_parent" color="black">
                                    <Text fontSize="lg" fontWeight={"bold"}>
                                        QRcode
                                    </Text>
                                </Link>
                            </Button>
                        </Stack>
                    </Flex>
                </Hide>
            </Container>

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"1%"} borderRadius="10px" shadow={"lg"} color="white">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Payment Details
                </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "lg"}>Merchandise subtotal 123123</Text>
                <Text fontSize={isSmallerThan768 ? "md" : "lg"}>Point discount 123</Text>
                <Text fontSize={isSmallerThan768 ? "md" : "lg"}>Total 123</Text>
            </Container>

            <Show below="md">
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
            </Show>
            <Hide below="md">
                <Container bg={"#e67f45"} maxW="100%" my="24px" p={"1%"} color="white">
                    <Flex>
                        <Box bg="orange.50" h="50px" w={"80%"} py="9px" borderRadius="10px">
                            <Text fontSize="xl" color={"black"} pl="5%" fontWeight={"bold"}>
                                Total payment 123,123
                            </Text>
                        </Box>
                        <Spacer />
                        <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg">
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Comfilm
                            </Text>
                        </Button>
                    </Flex>
                </Container>
            </Hide>
        </AppBody>
    )
}

export default shopTransaction
