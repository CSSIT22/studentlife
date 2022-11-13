import { Text, Container, Box, Stack, Button, Link } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/Header"
import OrderList from "../../../components/transaction/OrderList"
import UserAndPoint from "../../../components/transaction/UserAndPoint"

const shopTransaction = () => {
    return (
        <div>
            <AppBody />
            {/* header */}
            <Header header="CHECK OUT" />

            {/* user info + point */}
            <UserAndPoint userId="14785236" userEmail="mail@kmutt.ac.th" point={123} />

            {/* order list */}
            <Container maxW="80%" bg="orange.400" color="white" borderRadius="10px" py="23px" my={"24px"} shadow={"lg"}>
                <Text fontSize="xl" fontWeight={"bold"}>
                    Order List
                </Text>
                <Stack direction="column">
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
                    <OrderList
                        imageAlt=""
                        imageUrl="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        product="Sunglasses"
                        quantity={2}
                        price={"9,727"}
                    />
                </Stack>
            </Container>

            {/* payment method */}
            <Container maxW="80%" bg="orange.400" color="white" my={"24px"} py="23px" borderRadius="10px" shadow={"lg"}>
                <Stack direction={"row"} gap="30%">
                    <Text fontSize="xl" fontWeight={"bold"}>
                        Payment Method
                    </Text>
                    <Stack direction="row" gap="100px">
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
                </Stack>
            </Container>

            {/* payment detail */}
            <Container maxW="80%" bg="orange.400" color="white" py="23px" borderRadius="10px" shadow={"lg"} my="24px">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Payment Details
                </Text>
                <Text fontSize="lg">Merchandise subtotal 123123</Text>
                <Text fontSize="lg">Point discount 123</Text>
            </Container>

            {/* footer */}
            <Container maxW={"100%"} bg="orange.400" h={"103px"} py="25px">
                <Stack direction="row" gap="2%" justifyContent="center">
                    <Box bg="orange.50" h="50px" w={"71%"} py="9px" borderRadius="10px">
                        <Text fontSize="xl" color={"black"} pl="5%" fontWeight={"bold"}>
                            Total payment 123,123
                        </Text>
                    </Box>
                    <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg">
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Comfilm
                        </Text>
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default shopTransaction
