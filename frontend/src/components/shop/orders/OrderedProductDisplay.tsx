import { Box, LinkBox, LinkOverlay, Spacer, VStack, Grid, GridItem, HStack, Divider } from "@chakra-ui/react"
import React, { FC } from "react"
import { Badge, Button, Center, Flex, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import { Link } from "react-router-dom"
import ContentBox from "../ContentBox"

const OrderedProductDisplay: FC<{
    productId: number
    name: string
    price: number
    quantity: number
    image: string
}> = ({ productId, name, price, quantity, image }) => {
    const productBox = {
        border: "0px solid",
        borderRadius: "2xl",
        shadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        p: "7",
        bg: "#fff",
        cursor: "pointer",
        _hover: { transform: "scale(1.02)" },
        transitionDuration: "300ms"
    }
    const textDisplay = {
        fontSize: "xl",
        fontWeight: "400"
    }
    const labelT = {
        fontSize: "xl",
        fontWeight: "600",
        textAlign: "right"
    }
    return (
        <Box sx={productBox}>
            <Link to={"/shop/product/" + productId}>
                <Flex justify={"center"} direction={"column"} align={"left"} wrap={"wrap"} gap="3">
                    <Center>
                        <Image
                            width={"110px"}
                            height={{ base: "110px" }}
                            src={image}
                            alt="product picture"
                            placeholder="blur"
                            objectFit="cover"
                            shadow="lg" borderRadius="xl"
                        /></Center>
                    <Flex direction="column" wrap="wrap" align="left" justify="center" my="3" gap={3} >
                        {textInfo("Name:", name)}
                        {textInfo("Price:", convertCurrency(price))}
                        {textInfo("Qty:", quantity)}
                    </Flex>
                </Flex>
            </Link>
        </Box>
    )

    function textInfo(label: string, value: string | number) {
        return <Flex gap={2} justify="space-between"><Text sx={textDisplay}>{label}</Text> <Text noOfLines={2} sx={labelT}>{value}</Text></Flex>
    }
}

export default OrderedProductDisplay
