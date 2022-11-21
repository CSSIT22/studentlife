import { Text, Container, Box, Stack, Button, Link, useMediaQuery, Hide, Show, Flex, Spacer, Center } from "@chakra-ui/react"
import React, { useState } from "react"
import EbankModal from "src/components/transaction/methodpayment/EbankModal"
import MasterCardModal from "src/components/transaction/methodpayment/MasterCardModal"
import UsePoint from "src/components/transaction/shoptransaction/UsePoint"
import Userinfo from "src/components/transaction/shoptransaction/Userinfo"
import API from "src/function/API"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/shoptransaction/Header"
import OrderList from "../../../components/transaction/shoptransaction/OrderList"
import { useParams } from 'react-router-dom';

const shopTransaction = () => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const param = useParams()
    const [order, setOrder] = useState("")
    const submit = () => {
        API.post("/transaction/createTransaction", {
            orderId: param.orderid,
        })
    }

    return (
        <AppBody>
            <Header name="CHECKOUT" />

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"3%"} borderRadius="10px" shadow={"lg"}>
                <Stack direction={{ base: "column", lg: "row" }} justifyContent={"center"}>
                    <Userinfo id="123456789" email="mail123@kmutt.ac.th" />
                    <Spacer />
                    <UsePoint point={123} />
                </Stack>
            </Container>

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Order List
                </Text>
                <Stack direction={{ base: "row", lg: "column" }}>
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

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                <Show below="md">
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
                                    <Link href="shoptransaction/selectmethod">
                                        <Text fontSize="sm" fontWeight={"bold"} color="black">
                                            Select Method
                                        </Text>
                                    </Link>
                                </Button>
                            </Box>
                        </Center>
                    </Flex>
                </Show>
                <Hide below="md">
                    <Flex>
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Payment Method
                        </Text>
                        <Spacer />
                        <MasterCardModal />
                        <Spacer />
                        <EbankModal />
                        <Spacer />
                        <Button colorScheme="whiteAlpha" shadow={"lg"}>
                            <Text fontSize="lg" fontWeight={"bold"} color="black">
                                QRCODE
                            </Text>
                        </Button>
                    </Flex>
                    {/* 
                    <Collapse in={isOpen} animateOpacity>
                        <Box w={"100%"} p="40px" color="white" mt="4" bg="#fff2e5" rounded="md" shadow="md">
                            <Text fontSize="lg" color="black">
                            {method ? 'MasterCard' : 'ffff'}
                            </Text>
                        </Box>
                    </Collapse> */}
                    {/* <Collapse in={isOpen} animateOpacity>
                        <Box w={"100%"} p="40px" color="white" mt="4" bg="#fff2e5" rounded="md" shadow="md">
                            <Text fontSize="lg" color="black">
                                Card
                            </Text>
                        </Box>
                    </Collapse> */}
                </Hide>
            </Container>

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Payment Details
                </Text>
                <Text fontSize={{ base: "md", lg: "lg" }}>Merchandise subtotal : 123123</Text>
                <Text fontSize={{ base: "md", lg: "lg" }}>Point discount : 123</Text>
                <Text fontSize={{ base: "md", lg: "lg" }}>Total : 123</Text>
            </Container>

            <Show below="md">
                <Stack direction={"row"} justifyContent="center" gap={"3%"}>
                    <Button colorScheme="red" shadow={"lg"} variant="solid" size="lg">
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Cancel
                        </Text>
                    </Button>
                    <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg" onClick={submit}>
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Comfirm
                        </Text>
                    </Button>
                </Stack>
            </Show>
            <Hide below="md">
                <Container bg={"#e67f45"} maxW="100%" my="24px" p={"2%"} color="white">
                    <Flex>
                        <Box bg="orange.50" h="50px" w={"80%"} py="9px" borderRadius="10px">
                            <Text fontSize="xl" color={"black"} pl="5%" fontWeight={"bold"}>
                                Total payment 123,123
                            </Text>
                        </Box>
                        <Spacer />
                        <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg" onClick={submit}>
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Comfirm
                            </Text>
                        </Button>
                    </Flex>
                </Container>
            </Hide>
        </AppBody >
    )
}

export default shopTransaction
