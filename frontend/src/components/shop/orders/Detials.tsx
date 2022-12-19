import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center, Hide, Spacer } from "@chakra-ui/react"
import { FC } from "react"
import convertCurrency from "../functions/usefulFunctions"

const Details: FC<{
    totalPrice: number
    subtotal: number
    deliveryFee: number
    couponDiscount?: number | null
    address: string
    paymentMethod: string
}> = ({ totalPrice, subtotal, deliveryFee, couponDiscount, address, paymentMethod }) => {
    
    function labelData(label: string, value: string | number, isAdd?: boolean) {
        return <Flex>
            <label>
                <Text fontSize="lg">{label}</Text>
            </label>
            <Spacer />
            {isAdd ? <Text as="b" fontSize="lg" align="right" overflow={"hidden"} noOfLines={7}>{value}</Text> :
                <Text as="b" fontSize="lg" >{value}</Text>}
        </Flex>
    }

    return (
        <Flex direction="column" justify="center" p="4">
            <Grid templateColumns="repeat(5, 1fr)" gap={{ base: 0, md: 6 }} overflow={"hidden"}>
                {/* Left Side */}
                <GridItem colSpan={{ base: 5, md: 2 }}>
                    {labelData("Subtotal", convertCurrency(subtotal))}
                    {labelData("Delivery Fee:", convertCurrency(deliveryFee))}
                    {couponDiscount ? labelData("Coupon Discount:", convertCurrency(couponDiscount)) : <></>}
                    {labelData("Total:", convertCurrency(totalPrice))}
                </GridItem>
                {/* Space */}
                <GridItem colSpan={{ base: 0, md: 1 }}></GridItem>
                {/* Right Side */}
                <GridItem colSpan={{ base: 5, md: 2 }}>
                    {labelData("Shipping Address:", address, true)}
                    {labelData("Paid By:", paymentMethod)}
                </GridItem>
            </Grid>
        </Flex>
    )

}

export default Details
