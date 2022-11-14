import ShopAppBody from "../../../components/shop/ShopAppBody"
import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center, Show, Hide, LinkBox, LinkOverlay } from "@chakra-ui/react"
import React, { FC } from "react"
import generateProducts from "./OrderedProductDisplay"
import TitleBox from "../../../components/shop/TItleBox"
import Details from "./Details"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
const Orders= () => {
    return (
        <ShopAppBody>
            <Heading textAlign="center">Orders</Heading>
            <TitleBox title="Recent"></TitleBox>
            {generateOrders()}

            {/* Past */}
            <TitleBox title="Past"></TitleBox>
            {generateOrders()}
        </ShopAppBody>
    )
}

const OrderItems: FC<{
    orderNo: string
    orderDate: string
    orderStatus: string
}> = ({orderNo, orderDate, orderStatus}) => {
    const isMobile = useBreakpointValue({ base: true, sm: false })
    return (
        <div>
            {isMobile?
                <Flex direction="column" alignItems="center" wrap="wrap" my='3'>
                <Box bg="#FFFFFF"  borderRadius="10" boxShadow='xl'>
                    <Box display="flex" m='4'>
                        <Text fontSize='xs'>{orderNo?orderNo+" ":"<Order No> "}</Text>
                        <Text fontSize='xs'>order on Dec 12, 2022 at 12:00AM</Text>
                    </Box>
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                    <Details subtotal={10000}
                            deliveryFee={30}
                            couponDiscount={20}
                            address="No.1111, Blah Blah Quarter, Bangkok Thailand"
                            paymentMethod="Master Card"
                            orderStatus="Out for delivery"
                            noOfProduct={4}/>
                </Box>
            </Flex>:
            <Flex direction="column" alignItems="center" wrap="wrap" my='3'>
            <Box bg="#FFFFFF"  borderRadius="30" boxShadow='xl'>
                <Box display="flex" m='4'>
                <Hide breakpoint='(max-width: 768px)'>
                        <Text>{orderNo?orderNo+" ":"<Order No> "}</Text>
                        <Text>December, 24, 2022 at 12:00AM</Text>
                        <Text ml='auto'>{orderStatus?orderStatus: 'Delivered'}</Text>
                    </Hide>
                </Box>
                <Box h="min" w="full" bg="black" p="0.3"></Box>
                <Hide breakpoint='(max-width: 768px)'>
                    <Grid mt='2'>
                    {generateProducts()}
                    </Grid>
                </Hide>
                <Details subtotal={10000}
                         deliveryFee={30}
                         couponDiscount={20}
                         address="No.1111, Blah Blah Quarter, Bangkok Thailand"
                         paymentMethod="Master Card"
                         orderStatus="Out for delivery"
                         noOfProduct={4}/>
            </Box>
        </Flex>
        }
        </div>
    )
}

function generateOrders() {
    let products = []
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    for (let i = 0; i < 5; i++) {
        products.push(
            <OrderItems orderNo="fsdedc442095" orderDate={date} orderStatus="Out for delivery" />
        )
    }
    return products
}

export default Orders
