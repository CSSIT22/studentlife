import React, { useEffect, useState } from 'react'
import { Button, Flex, Text, GridItem, Checkbox, Grid, useBoolean } from "@chakra-ui/react"
import ShopAppBody from '../../../components/shop/ShopAppBody';
import TitleBox from '../../../components/shop/TItleBox'
import PageTitle from '../../../components/shop/PageTitle'
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import OrderConfirmProduct from '../../../components/shop/orders/OrderConfirmProduct';
import { DeleteIcon } from "@chakra-ui/icons"
import { Link, useLocation } from 'react-router-dom'
import ContentBox from "../../../components/shop/ContentBox"
import ThemedButton from "../../../components/shop/ThemedButton"
import { Shop_Cart } from '@apiType/shop';
import API from 'src/function/API';
const ConfirmOrder = () => {
    const [cartProducts, setCartProducts] = useState<Shop_Cart[] | null>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const location = useLocation()
    const add = location.state.add
    const getData = API.get("/shop/getAllProductsInCart")
    useEffect(() => {
        getData.then((res) => {setCartProducts(res.data)}).catch((err) => on()).finally(() => off())
    }, [cartProducts])
    let st = 0, dt = 0
    cartProducts?.forEach(cartProduct => {
        st += cartProduct.product.productPrice
        dt += cartProduct.product.deliveryFees
    })
    const summeryData = {
        subtotal: st,
        deliveryTotal: dt,
        total: st + dt
    }
    const shippingAddress = (
        <ContentBox bg='#fff'>
            <Flex direction='column' gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Shipping Address</Text>
                <Text>{add}</Text>
            </Flex>
        </ContentBox>
    )
    const orderSummary = (
        <ContentBox bg="#fff">
            <Flex direction="column" gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Order Summary</Text>
                <Flex gap={2} justify="space-between">
                    <Text>Subtotal</Text>
                    <Text as="b">{convertCurrency(summeryData.subtotal)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>TotalDelivery</Text>
                    <Text as="b">{convertCurrency(summeryData.deliveryTotal)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>Coupon Discount</Text>
                    <Text as="b">{convertCurrency(20)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>Total</Text>
                    <Text as="b">{convertCurrency(summeryData.total)}</Text>
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
