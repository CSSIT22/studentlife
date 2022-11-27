import { Shop_Product } from "@apiType/shop"
import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { Text, useBreakpointValue, Flex, LinkBox, LinkOverlay, Hide, ButtonGroup, IconButton, Button, Box, Image, Select, Spacer, Checkbox } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import API from "src/function/API"
import ContentBox from "./ContentBox"
import convertCurrency, { setDataAPI, updateDataAPI } from "./functions/usefulFunctions"
import QtyButton from "./QtyButton"
import TitleBox from "./TItleBox"
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}
const CartProduct: FC<{
    productId: number
    quantity: number
}> = ({productId, quantity}) => {
    const [product, setProduct] = useState<Shop_Product | null>(null)
    const deleteProduct = () => {
        API.delete("/shop/deleteCartProduct/" + productId).then(res => console.log(res)).catch(err => console.log(err))
    }
    const displayTextStyle = {
        fontWeight: "semibold",
        fontSize: "lg",
        as: "h4",
        lineHeight: "tight"
    }
    const completed = setDataAPI("/shop/getProductInformation/" + productId, setProduct)
    if (completed != true) {return completed}
    if (product != null){
        let displayImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
        if (product.images.length > 0) displayImage = product.images[0].image
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
                            <Text sx={displayTextStyle}>{product.productName}</Text>
                            <Text sx={displayTextStyle}>Price: {convertCurrency(product.productPrice)}</Text>
                        </Flex>
                        <Flex direction="column" justify="center" align="center">
                            <QtyButton productId={productId} quantity={quantity} stock={product.productStock}></QtyButton>
                        </Flex>
                    </Flex>
                    <IconButton icon={<DeleteIcon />} onClick={deleteProduct}aria-label={"Delete"} colorScheme="red" _hover={{transform: "scale(1.1)" }}  _active ={{transform: "scale(1.0)" }} transitionDuration="300ms"></IconButton>
                </Flex>
            </ContentBox>
        )
    }
    else { 
        return <TitleBox title={"An error occurred"}/>
    }
    
}

export default CartProduct
