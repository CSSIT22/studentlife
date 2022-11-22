import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue, Heading, Divider, Center, Hide, Spacer } from "@chakra-ui/react"
import { FC } from "react"
import convertCurrency from "../functions/usefulFunctions"

const Details: FC<{
    subtotal: number
    deliveryFee: number
    couponDiscount: number
    address: string
    paymentMethod: string
}> = ({ subtotal, deliveryFee, couponDiscount, address, paymentMethod }) => {
    return (
        <Flex direction="column" justify="center" p="4">
            <Grid templateColumns="repeat(5, 1fr)" gap={{ base: 0, md: 6 }} overflow={"hidden"}>
                <GridItem colSpan={{ base: 5, md: 2 }}>
                    <Flex>
                        <label>
                            <Text as="b">Subtotal:</Text>
                        </label>
                        <Spacer />
                        <Text ml="auto">{convertCurrency(subtotal)}</Text>
                    </Flex>
                    <Flex>
                        <label>
                            <Text as="b">Delivery Fee:</Text>
                        </label>{" "}
                        <Spacer />
                        <Text ml="auto">{convertCurrency(deliveryFee)}</Text>
                    </Flex>
                    <Flex>
                        <label>
                            <Text as="b">Coupon Discount:</Text>
                        </label>{" "}
                        <Spacer />
                        <Text ml="auto">{convertCurrency(couponDiscount)}</Text>
                    </Flex>
                    <Flex>
                        <label>
                            <Text as="b">Total:</Text>
                        </label>{" "}
                        <Spacer />
                        <Text ml="auto">{convertCurrency(subtotal + deliveryFee - couponDiscount)}</Text>
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 0, md: 1 }}></GridItem>
                <GridItem colSpan={{ base: 5, md: 2 }}>
                    <Flex>
                        <label>
                            <Text as="b">Shipping Address: </Text>
                        </label>{" "}
                        <Spacer />
                        <Text align="right" overflow={"hidden"} noOfLines={7}>
                            {address}
                        </Text>
                    </Flex>
                    <Flex>
                        <label>
                            <Text as="b">Paid By:</Text>
                        </label>{" "}
                        <Spacer />
                        <Text>{paymentMethod}</Text>
                    </Flex>
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default Details
