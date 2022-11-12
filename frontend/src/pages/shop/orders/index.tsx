import ShopAppBody from "../../../components/shop/ShopAppBody"
import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import generateProducts from "./OrderedProductDisplay"
import Details from "./Details"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
const Orders: FC<{
    orderNo: number
    date: Date
    orderStatus: string
}> = ({orderNo, date, orderStatus}) => {
    return (
        <ShopAppBody>
            <Heading textAlign="center">Orders</Heading>
            <Box bg="#CBD5E0" borderRadius='10' mt='4' height='35' width="80%" mx='10%'>
                <Text fontSize="lg" as="b" p='10' lineHeight="200%">Recent</Text>
            </Box>
            <Flex justify="center" wrap="wrap" gap="1rem" my='3'>
                <Box bg="#E2E8F0"  borderRadius="10" border='1px'>
                    <Box display="flex" m='4'>
                        <Text>{orderNo?orderNo:"<Order No>"}</Text>
                        <Text>December, 24, 2022 at 12:00AM</Text>
                        <Text ml='auto'>{orderStatus?orderStatus: 'Delivered'}</Text>
                    </Box>
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                    <Grid mt='2'>
                    {generateProducts()}
                    </Grid>
                    <Details subtotal={10000} deliveryFee={30} couponDiscount={20} address="No.1111, Blah Blah Quarter, Bangkok Thailand" paymentMethod="Master Card"/>
                </Box>
            </Flex>
            <Box bg="#CBD5E0" borderRadius='10' mt='4' height='35' width="80%" mx='10%'>
                <Text fontSize="lg" as="b" p='10' lineHeight="200%">Past</Text>
            </Box>
            <Flex justify="center" wrap="wrap" gap="1rem" my='3'>
                <Box bg="#E2E8F0"  borderRadius="10" border='1px'>
                    <Box display="flex" m='4'>
                        <Text>{orderNo?orderNo:"<Order No>"}</Text>
                        <Text>December, 24, 2022 at 12:00AM</Text>
                        <Text ml='auto'>{orderStatus?orderStatus: 'Delivered'}</Text>
                    </Box>
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                    <Grid mt='2'>
                    {generateProducts()}
                    </Grid>
                    <Details subtotal={10000} deliveryFee={30} couponDiscount={20} address="No.1111, Blah Blah Quarter, Bangkok Thailand" paymentMethod="Master Card"/>
                </Box>
            </Flex>
        </ShopAppBody>
    )
}


export default Orders
