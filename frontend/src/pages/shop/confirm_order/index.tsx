import React from 'react'
import { Button, Flex, Text, GridItem, Checkbox, Grid } from "@chakra-ui/react"
import ShopAppBody from '../../../components/shop/ShopAppBody';
import TitleBox from '../../../components/shop/TItleBox'
import PageTitle from '../../../components/shop/PageTitle'
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import OrderConfirmProduct from '../../../components/shop/orders/OrderConfirmProduct';
import { DeleteIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import ContentBox from "../../../components/shop/ContentBox"
import ThemedButton from "../../../components/shop/ThemedButton"
const ConfirmOrder = () => {
    const selectBox = (
        <ContentBox bg="#fff">
            <Flex justify="space-between" wrap="wrap">
                <Checkbox size="lg" px="15" py="2" colorScheme="orange">
                    <Text fontSize="md" fontWeight="700" color="#747474">
                        Select All
                    </Text>
                </Checkbox>
                <Button variant="ghost" fontWeight="light">
                    <DeleteIcon />{" "}
                    <Text fontSize="md" fontWeight="700" color="#747474" pl={2}>
                        Delete
                    </Text>
                </Button>
            </Flex>
        </ContentBox>
    )
    const shippingAddress = (
        <ContentBox bg='#fff'>
            <Flex direction='column' gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Shipping Address</Text>
                <Text>xxxx xxxx xxxxx x xxxxx xxxxxx xxxxx xxxxxxx xxxxx xxxx xxxxxx xxxxxxx xx xxxxxxxxxxxxxxxxx xxxxxxxx</Text>
            </Flex>
        </ContentBox>
    )
    const orderSummary = (
        <ContentBox bg="#fff">
            <Flex direction="column" gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Order Summary</Text>
                <Flex gap={2} justify="space-between">
                    <Text>Subtotal</Text>
                    <Text as="b">{convertCurrency(3210)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>DeliveryFees</Text>
                    <Text as="b">{convertCurrency(50)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>Coupon Discount</Text>
                    <Text as="b">{convertCurrency(20)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>Total</Text>
                    <Text as="b">{convertCurrency(3240)}</Text>
                </Flex>
                <Flex justify="center" >
                    <Link to="../shop/order_completed">
                        <ThemedButton>PAY NOW</ThemedButton>
                    </Link>
                </Flex>
            </Flex>

        </ContentBox>
    )

    return (
        <ShopAppBody>
            <PageTitle title="Confirm Order" />
            <Grid templateColumns="3fr 2fr" gap={5}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={2}>
                        <TitleBox title="Order Includes" />
                        <Grid bg='#fff' boxShadow='lg' borderRadius='lg'>
                            {generateCartProducts()}
                        </Grid>
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={2}>
                        {shippingAddress}
                        {orderSummary}
                    </Flex>
                </GridItem>
            </Grid>
        </ShopAppBody>
    )
}
export function generateCartProducts() {
    let products = []
    for (let i = 0; i < 3; i++) {
        products.push(
            <GridItem bg="" borderBottom="1px" pl='2'>
                <OrderConfirmProduct
                    id={1}
                    name="Pen"
                    price={10000}
                    quantity={2}
                    image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                ></OrderConfirmProduct>
            </GridItem>
        )
    }
    return products
}

export default ConfirmOrder
