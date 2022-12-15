import { Flex, Text, Box, Grid, SimpleGrid, useBoolean } from "@chakra-ui/react"
import { FC } from "react"
import Details from "./Detials"
import { dateFormat } from "../functions/usefulFunctions"
import ContentBox from "../ContentBox"
import OrderedProductDisplay from "./OrderedProductDisplay"

const OrderItems: FC<{
    orderNo: number
}> = ({ orderNo }) => {
    const [isCollapse, { on, off }] = useBoolean(true)
    // TODO: Get Order Info from backend
    let orderStatus = "Out For Delivery"
    let orderDateTime = dateFormat(new Date(2021, 10, 10, 10, 10, 10))
    let subtotal = 10000,
        deliveryFee = 30,
        couponDiscount = 20,
        address = "No.1111, Blahxxxxxxx  Blah Quarter, Bangkok Thailand",
        paymentMethod = "Master Card"

    // Style Text
    const detailText = {
        fontSize: "md",
        fontWeight: "500"
    }

    // Components
    const orderSummary = (
        <Flex p="4" wrap="wrap" justify="space-between" gap={5} onClick={isCollapse ? off : on}>
            <Text sx={detailText}>{"#" + orderNo}</Text>
            <Text sx={detailText}>{orderDateTime}</Text>
            <Text sx={detailText}>{orderStatus}</Text>
        </Flex>
    )
    const divide = <Box h="min" w="full" bg="black" p="0.3"></Box>
    const productsComp = (
        <SimpleGrid columns={{ base: 1, md: 2 }} p={{ base: 3, sm: 7 }} gap={4}>
            {generateProducts()}
        </SimpleGrid>
    )
    return (
        <ContentBox bg="#FFFFFF">
            {orderSummary}
            {isCollapse ? <>
            </> : <>
            {divide}
                {productsComp}
                {divide}
                <Details
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    couponDiscount={couponDiscount}
                    address={address}
                    paymentMethod={paymentMethod}
                />
            </>}

        </ContentBox>
    )
}

function generateProducts() {
    let products = []
    for (let i = 0; i < 1; i++) {
        products.push(
            <OrderedProductDisplay
                productId={1}
                name="Pen"
                price={10000}
                quantity={2}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            ></OrderedProductDisplay>
        )
        products.push(
            <OrderedProductDisplay
                productId={1}
                name="Pen New Limited Edition Exuisite 2022"
                price={10000}
                quantity={2}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            ></OrderedProductDisplay>
        )
    }
    return products
}

export default OrderItems
