import { Box, Flex, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react"
import React from "react"
import ContentBox from "./ContentBox"

const CouponDisplay = () => {
    return (
        <ContentBox>
            <Grid templateRows="repeat(8, 1fr)" templateColumns="repeat(10, 1fr)" gap={3} p="4">
                <GridItem rowSpan={8} colSpan={2} overflow={"hidden"} bg= "red">
                    <Flex h="full" justify="center" align="center">
                        <Text>// Coupon Code</Text>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={8} colSpan={1} overflow={"hidden"} bg="red">
                    <Box h="full" w="min" bg="black" p="0.3"></Box>
                </GridItem>
                <GridItem rowSpan={2} colSpan={7} overflow={"hidden"} bg= "red">
                    // Amount
                </GridItem>
                <GridItem rowSpan={1} colSpan={7} overflow={"hidden"} bg="red">
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                </GridItem>
                <GridItem rowSpan={2} colSpan={7} overflow={"hidden"} bg="red">
                    // Details
                </GridItem><GridItem rowSpan={1} colSpan={7} overflow={"hidden"} bg="red">
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                </GridItem>
                <GridItem rowSpan={2} colSpan={7} overflow={"hidden"} bg="red">
                    // Validity
                </GridItem>
            </Grid>
        </ContentBox>
    )
}

export default CouponDisplay
