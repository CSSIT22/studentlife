import { useBreakpointValue, Flex, Grid, GridItem, Box, Text, Checkbox, Button, Input } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"
import ThemedButton from "src/components/shop/ThemedButton"

// Cart
const Cart = () => {
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
    const orderSummary = (
        <ContentBox bg="#fff">
            <Flex direction="column" gap={5} p="5">
                <Text fontSize="md" fontWeight="700">
                    Order Summary
                </Text>
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
                    <Text>Total</Text>
                    <Text as="b">{convertCurrency(3260)}</Text>
                </Flex>
                <Flex justify="center">
                    <ThemedButton>CHECKOUT</ThemedButton>
                </Flex>
            </Flex>
        </ContentBox>
    )

    return (
        <ShopAppBody>
            <PageTitle title="Cart" />
            <Grid templateColumns="3fr 2fr" gap={5}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={2}>
                        {selectBox}
                        {generateCartProducts()}
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>{orderSummary}</GridItem>
            </Grid>
        </ShopAppBody>
    )
}

function generateCartProducts() {
    let cart = []
    for (let i = 0; i < 5; i++) {
        cart.push(
            <CartProduct
                name="iPhone 15 Pro max"
                price={50000}
                quantity={2}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                link="/shop/product/productDetail"
                stock={15}
            />
        )
    }
    return cart
}

export default Cart
