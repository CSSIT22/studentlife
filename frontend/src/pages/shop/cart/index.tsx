import { useBreakpointValue, Flex, Grid, GridItem, Box, Text, Checkbox, Button, Input, LinkBox, useBoolean } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import convertCurrency, { setDataAPI } from "../../../components/shop/functions/usefulFunctions"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"
import ThemedButton from "src/components/shop/ThemedButton"
import TitleBox from "src/components/shop/TItleBox"
import { useState } from "react"
import { Shop_Cart } from "@apiType/shop"

// Cart
const Cart = () => {
    const [cartProducts, setCartProducts] = useState<Shop_Cart[] | null>(null)
    setDataAPI("/shop/getAllProductsInCart", setCartProducts)
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
                    <Input
                        type="text"
                        placeholder="Enter Coupon Code"
                        shadow="md"
                        border="1px solid #CBD5E0"
                        borderRadius="10px"
                        size={"md"}
                        background="white"

                    ></Input>
                    <ThemedButton maxW="24"> APPLY </ThemedButton>
                </Flex>
                <Button variant="link" width="min">
                    See Your Coupons
                </Button>
                <Flex gap={2} justify="space-between">
                    <Text >Total</Text>
                    <Text as="b">{convertCurrency(3260)}</Text>
                </Flex>
                <Flex justify="center" >
                    <LinkBox>
                        <Link to="../shop/checkout">
                            <ThemedButton>CHECKOUT</ThemedButton>
                        </Link>
                    </LinkBox>
                </Flex>
            </Flex>

        </ContentBox>
    )
    return (
        <ShopAppBody>
            <PageTitle title="Cart" />

            <Grid templateColumns="3fr 2fr" gap={5}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={5}>
                        <TitleBox title="Products in Cart"></TitleBox>
                        {generateCartProducts(cartProducts)}
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    {orderSummary}
                </GridItem>
            </Grid>

        </ShopAppBody>
    )
}

function generateCartProducts(cartProducts: Shop_Cart[] | null) {
    try {
        if (cartProducts != null && cartProducts.length > 0) {
            let cart = []
            for (let i = 0; i < cartProducts.length; i++) {
                cart.push(
                    <CartProduct
                        productId={cartProducts[i].productId}
                        quantity={cartProducts[i].quantity}
                    />
                )
            }
            return cart
        }
    } catch (error) {
        return (<> An Error has Occured! Please Try Again Later</>)
    }

}

export default Cart
