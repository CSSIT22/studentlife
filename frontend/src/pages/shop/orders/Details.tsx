
import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center, Hide } from "@chakra-ui/react"
import React, { FC } from "react"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
const Details: FC<{
    subtotal: number
    deliveryFee: number
    couponDiscount: number
    address: string
    paymentMethod: string
    orderStatus: string
    noOfProduct: number
}> = ({subtotal, deliveryFee, couponDiscount, address, paymentMethod, orderStatus, noOfProduct}) => {
    return(
        <Flex direction="column" justify="center" p="4">
            <Grid templateColumns='repeat(5, 1fr)' gap={6} display='flex'>
                {/* For Mobile */}
                <Hide breakpoint='(min-width: 768px)'>
                    <GridItem colSpan={5} w='100%'> 
                        <Box display='flex'>
                            <label><Text as='b'>Total Paid: </Text></label>
                            <Text> {convertCurrency(subtotal+deliveryFee-couponDiscount)}</Text>
                        </Box>
                        <Box display='flex'>
                            <label><Text as='b'>Status: </Text></label>
                            <Text> {orderStatus}</Text>
                        </Box>
                        <Box display='flex'>
                            <Text> {noOfProduct} product(s) were ordered</Text>
                        </Box>
                    </GridItem>
                </Hide>
                {/* For Desktop */}
                <Hide breakpoint='(max-width: 768px)'>
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
                </Hide>
                {/* Show in desktop only */}
                <Hide breakpoint='(max-width: 768px)'>
                <GridItem colSpan={2} w='100%' ml='10'> 
                    <Box>
                        <label><Text as='b'>Shipping Address</Text></label>
                        <Text>{address?address: 'No.1111, Blah Blah Quarter, Bangkok Thailand'}</Text>
                    </Box>
                    <Box display='flex'>
                        <label><Text as='b'>Paid By:</Text></label>
                        <Text ml='30%'>{paymentMethod?paymentMethod: 'Visa Card'}</Text>
                    </Box>
                </GridItem>
                </Hide>
            </Grid>
        </Flex>
    )
}


export default Details