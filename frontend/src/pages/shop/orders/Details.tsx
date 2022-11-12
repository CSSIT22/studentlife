
import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
const Details: FC<{
    subtotal: number
    deliveryFee: number
    couponDiscount: number
    address: string
    paymentMethod: string
}> = ({subtotal, deliveryFee, couponDiscount, address, paymentMethod}) => {
    return(
        <Box m="2">
            <Grid templateColumns='repeat(5, 1fr)' gap={6} display='flex'>
                <GridItem colSpan={3} w='100%'> 
                    <Box display='flex'>
                        <label><Text as='b'>Subtotal:</Text></label>
                        <Text ml='auto'>{subtotal?convertCurrency(subtotal): 10000}</Text>
                    </Box>
                    <Box display='flex'>
                        <label><Text as='b'>Delivery Fee:</Text></label>
                        <Text ml='auto'>{deliveryFee?convertCurrency(deliveryFee): 30}</Text>
                    </Box>
                    <Box display='flex'>
                        <label><Text as='b'>Coupon Discount:</Text></label>
                        <Text ml='auto'>{couponDiscount?convertCurrency(couponDiscount): 20}</Text>
                    </Box>
                    <Box display='flex'>
                        <label><Text as='b'>Total:</Text></label>
                        <Text ml='auto'>{convertCurrency(subtotal+deliveryFee-couponDiscount)}</Text>
                    </Box>
                </GridItem>
                <GridItem colSpan={2} w='100%'> 
                    <Box>
                        <label><Text as='b'>Shipping Address</Text></label>
                        <Text mx='4'>{address?address: 'No.1111, Blah Blah Quarter, Bangkok Thailand'}</Text>
                    </Box>
                    <Box display='flex'>
                        <label><Text as='b'>Paid By:</Text></label>
                        <Text ml='auto'>{paymentMethod?paymentMethod: 'Visa Card'}</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}


export default Details