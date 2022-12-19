import { DeleteIcon } from "@chakra-ui/icons"
import { Text, Flex, IconButton, Box, Image } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import ContentBox from "./ContentBox"
import convertCurrency from "./functions/usefulFunctions"
import QtyButton from "./QtyButton"



const CartProduct: FC<{
    productId: number
    quantity: number
    images: { image: string }[]
    productName: string
    productPrice: number
    productStock: number
    increaseQty: (productId: number) => void
    decreaseQty: (productId: number) => void
    onDelete:  (productId: number) => void
}> = ({ productId, quantity, images, productName, productPrice, productStock, increaseQty, decreaseQty, onDelete}) => {
    const displayTextStyle = {
        fontWeight: "semibold",
        fontSize: "lg",
        as: "h4",
        lineHeight: "tight",
        noOfLines: 1,
        overflow: "hidden"
    }
    const displayTextLink = {
        fontWeight: "semibold",
        fontSize: "lg",
        as: "h4",
        lineHeight: "tight",
        noOfLines: 1,
        overflow: "hidden",
        cursor: "pointer",
        _hover: { transform: "scale(1.1)", bg: "#eee" },
        transitionDuration: "300ms"
    }
    const imageStyle = {
        width: "8rem",
        borderRadius: "lg",
        border: "3px solid",
        height: "7.2rem",
        objectFit: "cover",
    }
    let displayImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    if (images.length > 0) displayImage = images[0].image
    return (
        <motion.div initial={{scale: 0.1}} animate={{ scale: 1}} transition={{
            default: { ease: "backOut", duration: 0.5}
          }}>
        <ContentBox>
            <Flex p="5" align="center" gap={5}>
                <Flex wrap="wrap" gap={5} justify="space-around" width="full" align="center">
                    {/* // Image */}
                    <Link to={"/shop/product/" + productId}>
                        <Box borderRadius="lg" overflow="hidden" shadow="lg" cursor="pointer" _hover={{ transform: "scale(1.1)", bg: "#eee" }} transitionDuration="300ms">
                            <Image sx={imageStyle} src={displayImage} alt="Img of Product" />
                        </Box>
                    </Link>
                        {/* // Text */}
                        <Flex direction="column" justify="center">
                            <Link to={"/shop/product/" + productId}>
                                <Text sx={displayTextLink}>{productName}</Text>
                            </Link>
                            <Text sx={displayTextStyle}>Price: {convertCurrency(productPrice)}</Text>
                        </Flex>
                        <Flex direction="column" justify="center" align="center">
                            <QtyButton productId={productId} quantity={quantity} stock={productStock} increaseQty = {increaseQty} decreaseQty={decreaseQty}></QtyButton>
                        </Flex>
                </Flex>
                <IconButton icon={<DeleteIcon />} onClick={() => onDelete(productId)} aria-label={"Delete"} colorScheme="red" _hover={{ transform: "scale(1.1)" }} _active={{ transform: "scale(1.0)" }} transitionDuration="300ms"></IconButton>
            </Flex>
        </ContentBox>
        </motion.div>
    )
}

export default CartProduct
