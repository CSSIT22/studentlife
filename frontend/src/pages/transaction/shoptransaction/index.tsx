import { Text, Container, Box, Stack, Button, useMediaQuery, Hide, Show, Flex, Spacer, Center, GridItem } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import API from "src/function/API"
import AppBody from "../../../components/share/app/AppBody"
import Header from "../../../components/transaction/shoptransaction/Header"
import OrderList from "../../../components/transaction/shoptransaction/OrderList"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import PaymentMethod from "src/components/transaction/methodpayment/PaymentMethod"
import qrpayment from "./qrpayment"
import { Link } from "react-router-dom"
import { confirmOrder } from "@apiType/transaction"

export function generateConfirmCartProducts(ProductsList: confirmOrder) {
    if (ProductsList == null) return null
    let products = []

    const numberFormat = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" })

    for (let i = 0; i < ProductsList.products.length; i++) {
        const price = parseFloat(ProductsList.products[i].product.productPrice)
        const formattedPrice = numberFormat.format(price)

        products.push(
            <GridItem bg="" pl="2">
                <OrderList
                    imageAlt={ProductsList.products[i].product.productName}
                    imageUrl={ProductsList.products[i].product.images[0].image}
                    product={ProductsList.products[i].product.productName}
                    price={formattedPrice}
                    quantity={ProductsList.products[i].quantity}
                ></OrderList>
            </GridItem>
        )
    }
    return products
}

const shopTransaction = () => {
    const param = useParams()
    const orderId = useLocation().state.orderId
    const tranactionId = useLocation().state.tranactionId
    let [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate()
    const toQRpayment = () => {
        navigate("/transaction/shoptransaction/qrpayment", { state: { transactionId: orderDetails.transId, totalPrice: orderDetails.totalPrice } })
    }

    const [orderDetails, setOrderDetails] = useState<any>(null)
    useEffect(() => {
        API.get("/shop/getOrderInformation/" + orderId)
            .then((res) => {
                setOrderDetails(res.data) // Sets orderDetails to the result from API
                setTotalPrice(parseFloat(res.data.totalPrice))
            })
            .catch((error) => {
                console.log(error)
                // Write extra code in case of error over here
            })
    }, [])

    const numberFormat = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" })
    const formattedNumberTotalPrice = numberFormat.format(totalPrice)

    return (
        <AppBody>
            <Header name="CHECKOUT" />

            <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                <Text fontSize="xl" fontWeight={"bold"}>
                    Order List
                </Text>
                <Stack direction={"column"}>{generateConfirmCartProducts(orderDetails)}</Stack>
            </Container>

            <PaymentMethod />
            <Show below="md">
                <Container bg={"#e67f45"} maxW="90%" my="24px" p={"2%"} borderRadius="10px" shadow={"lg"} color="white">
                    <Center>
                        <Stack direction={"column"}>
                            <Text fontSize="md" fontWeight={"bold"}>
                                Total payment: {formattedNumberTotalPrice}
                            </Text>
                        </Stack>
                    </Center>
                </Container>
                <Center>
                    <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg" onClick={toQRpayment}>
                        <Text fontSize="lg" fontWeight={"bold"}>
                            Comfirm
                        </Text>
                    </Button>
                </Center>
            </Show>
            <Hide below="md">
                <Container bg={"#e67f45"} maxW="100%" my="24px" p={"2%"} color="white">
                    <Flex>
                        <Box bg="orange.50" h="50px" w={"80%"} py="9px" borderRadius="10px">
                            <Text fontSize="xl" color={"black"} pl="5%" fontWeight={"bold"}>
                                Total payment : {formattedNumberTotalPrice}
                            </Text>
                        </Box>
                        <Spacer />
                        <Button colorScheme="green" shadow={"lg"} variant="solid" size="lg" onClick={toQRpayment}>
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Comfirm
                            </Text>
                        </Button>
                    </Flex>
                </Container>
            </Hide>
        </AppBody>
    )
}

export default shopTransaction
