import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { Text, useBreakpointValue, Flex, LinkBox, LinkOverlay, Hide, ButtonGroup, IconButton, Button, Box, Image, Select, Spacer, Checkbox } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import ContentBox from "./ContentBox"
import convertCurrency from "./functions/usefulFunctions"
import QtyButton from "./QtyButton"

const CartProduct: FC<{
    productId: number
    cartId: number
    name: string
    price: number
    quantity: number
    image: string
    link: string
    stock: number
}> = ({ name, price, quantity, image, link, stock, productId, cartId }) => {
    const displayTextStyle = {
        fontWeight: "semibold",
        fontSize: "lg",
        as: "h4",
        lineHeight: "tight"
    }
    return (
        <ContentBox>
            <Flex p="5" align="center" gap={5}>
                <Flex wrap="wrap" gap={5} justify="space-around" width="full" align="center">
                    {/* // Image */}
                    <Box borderRadius="lg" overflow="hidden" shadow="sm">
                        <Image width="8rem" height="7.2rem" src={image} alt="Img" objectFit="cover" />
                    </Box>
                    {/* // Text */}
                    <Flex direction="column" justify="center">
                        <Text sx={displayTextStyle}>{name}</Text>
                        <Text sx={displayTextStyle}>Price: {convertCurrency(price)}</Text>
                    </Flex>
                    <Flex direction="column" justify="center" align="center">
                        <QtyButton productId={productId} cartId={cartId} quantity={quantity} stock={stock}></QtyButton>
                    </Flex>
                </Flex>
                <IconButton icon={<DeleteIcon />} aria-label={"Delete"} colorScheme="red" _hover={{transform: "scale(1.1)" }}  _active ={{transform: "scale(1.0)" }} transitionDuration="300ms"></IconButton>
            </Flex>
        </ContentBox>
    )
}

export default CartProduct
