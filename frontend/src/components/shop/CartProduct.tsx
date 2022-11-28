import { DeleteIcon } from "@chakra-ui/icons"
import { Text,Flex, IconButton, Box, Image } from "@chakra-ui/react"
import React, { FC } from "react"
import API from "src/function/API"
import ContentBox from "./ContentBox"
import convertCurrency from "./functions/usefulFunctions"
import QtyButton from "./QtyButton"



const CartProduct: FC<{
    productId: number
    quantity: number
    images: {image: string}[]
    productName: string
    productPrice: number
    productStock: number
}> = ({ productId, quantity, images, productName, productPrice, productStock}) => {
    const deleteProduct = () => {
        API.delete("/shop/deleteCartProduct/" + productId).then(res => console.log(res)).catch(err => console.log(err))
    }
    const displayTextStyle = {
        fontWeight: "semibold",
        fontSize: "lg",
        as: "h4",
        lineHeight: "tight",
        noOfLines: 1,
        overflow: "hidden"
    }
        let displayImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
        if (images.length > 0) displayImage = images[0].image
        return (
            <ContentBox>
                <Flex p="5" align="center" gap={5}>
                    <Flex wrap="wrap" gap={5} justify="space-around" width="full" align="center">
                        {/* // Image */}
                        <Box borderRadius="lg" overflow="hidden" shadow="lg">
                            <Image width="8rem" borderRadius="lg" border="3px solid" height="7.2rem" src={displayImage} alt="Img" objectFit="cover" />
                        </Box>
                        {/* // Text */}
                        <Flex direction="column" justify="center">
                            <Text sx={displayTextStyle}>{productName}</Text>
                            <Text sx={displayTextStyle}>Price: {convertCurrency(productPrice)}</Text>
                        </Flex>
                        <Flex direction="column" justify="center" align="center">
                            <QtyButton productId={productId} quantity={quantity} stock={productStock}></QtyButton>
                        </Flex>
                    </Flex>
                    <IconButton icon={<DeleteIcon />} onClick={deleteProduct} aria-label={"Delete"} colorScheme="red" _hover={{ transform: "scale(1.1)" }} _active={{ transform: "scale(1.0)" }} transitionDuration="300ms"></IconButton>
                </Flex>
            </ContentBox>
        )
}

export default CartProduct
