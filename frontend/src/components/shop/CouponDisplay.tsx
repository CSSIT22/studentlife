import { Box, Flex, Grid, GridItem, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { FC } from "react"
import ContentBox from "./ContentBox"
import convertCurrency from "./functions/usefulFunctions"

const CouponDisplay: FC<{
    couponCode: string
    discountAmount: number
    minSpend: number
    details: string
    validUntil: string
}> = ({ couponCode, discountAmount, details, validUntil, minSpend }) => {
    const isMobile = useBreakpointValue({ base: true, sm: false })
    return (
        <ContentBox bg="#fff" sh="xl" br="3xl">
            <Grid
                templateAreas={{
                    base: `"name name name"
                                         "dh1 dh1 dh1"
                                         "amount amount amount"
                                         "dh2 dh2 dh2"
                                         "details details details"
                                         "dh3 dh3 dh3"
                                         "valid valid valid"
                                `,
                    sm: `"name d1 amount"
                                "name d1 dh1"
                                "name d1 details"
                                "name d1 dh2"
                                "name d1 valid"`,
                }}
                gridTemplateRows={"5fr 1fr 5fr 1fr 5fr"}
                gridTemplateColumns={"12fr 1fr 28fr"}
                gap="4"
                p="5"
                color="#000"
                fontWeight="bold"
            >
                <GridItem overflow={"hidden"} area="name">
                    <Flex h="full" justify="center" align="center">
                        <Text fontSize="3xl" fontWeight="800">
                            {couponCode}
                        </Text>
                    </Flex>
                </GridItem>
                {isMobile ? (
                    <></>
                ) : (
                    <GridItem overflow={"hidden"} area="d1">
                        <Box h="full" w="min" bg="black" p="0.3"></Box>
                    </GridItem>
                )}

                <GridItem overflow={"hidden"} area="amount">
                    <HStack justify="center" wrap="wrap">
                        <Text fontSize="2xl" fontWeight="700">
                            {convertCurrency(discountAmount)}
                        </Text>
                        <Text fontSize={"lg"} fontWeight="400" align="center">
                            Minimum Spend {convertCurrency(minSpend)}
                        </Text>
                    </HStack>
                </GridItem>
                <GridItem overflow={"hidden"} area="dh1">
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                </GridItem>
                <GridItem overflow={"hidden"} area="details">
                    <HStack justify="center" align="center" wrap="wrap">
                        <Text fontSize={"xl"} fontWeight={700}>
                            Details
                        </Text>{" "}
                        <Text align="center" noOfLines={5} fontSize="lg" fontWeight="400">
                            {details}
                        </Text>
                    </HStack>
                </GridItem>
                <GridItem overflow={"hidden"} area="dh2">
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                </GridItem>
                {isMobile ? (
                    <GridItem overflow={"hidden"} area="dh3">
                        <Box h="min" w="full" bg="black" p="0.3"></Box>
                    </GridItem>
                ) : (
                    <></>
                )}

                <GridItem overflow={"hidden"} area="valid">
                    <HStack justify="center" wrap="wrap">
                        <Text fontSize="xl" fontWeight="700">
                            Valid Until:
                        </Text>
                        <Text fontSize="lg" fontWeight="400">
                            {" "}
                            {validUntil}
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
        </ContentBox>
    )
}

export default CouponDisplay
