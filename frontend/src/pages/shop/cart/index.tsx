import { useBreakpointValue, Flex, Grid, GridItem, Box, Text, Checkbox, Button } from "@chakra-ui/react"
import { DeleteIcon} from "@chakra-ui/icons"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"


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
            <Flex direction="column" gap={2} p="5">
                <Text fontSize="lg">Order Summary</Text>
                <Flex gap={2}>
                    <Text>Subtotal</Text>
                    <Text>{convertCurrency(3210)}</Text>
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
