import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import { placeHolderImg } from "./content/extraData"
import convertCurrency from "./functions/usefulFunctions"

type propsType = FC<{
    id: number
    name: string
    brandName: string
    price: number
    image?: string
}>

const styles = {
    productBox: {
        mt: "6",
        background: "white",
        width: "11rem", height: "16rem",
        borderRadius: "lg",
        overflow: "hidden",
        shadow: "xl",
        border: "1px solid", _hover: { transform: "scale(1.1)" }, transitionDuration: "300ms"
    },
    productName: {
        mt: 1,
        fontWeight: 'semibold',
        as: 'h4',
        lineHeight: 'tight',
        noOfLines: 1
    },
    animationStyles: {
        initial: { scale: 0.1 },
        animate: { scale: 1 },
        transition: { default: { ease: "backOut", duration: 0.5 } }
    }
}

const ProductDisplay: propsType = ({ id, name, brandName, price, image }) => {
    // Set Image to Placeholder
    let displayImage: string
    image ? displayImage = image : displayImage = placeHolderImg

    return (
        <motion.div initial={styles.animationStyles.initial} animate={styles.animationStyles.animate} transition={styles.animationStyles.transition}>
            <Link to={"/shop/product/" + id}>
                <Box sx={styles.productBox}>
                    <Flex direction="column">
                        <Box mt="3" mx="3" mb="2" borderRadius="lg" overflow="hidden" shadow="md">
                            <Image width="11rem" height="9rem" src={displayImage} alt="Img" objectFit="cover" />
                        </Box>
                        <Box px="6">
                            <Text sx={styles.productName}>{name}</Text>
                            <Text fontSize="sm"> {brandName} </Text>
                            <Text fontSize="sm"> {convertCurrency(price)} </Text>
                        </Box>
                    </Flex>
                </Box>
            </Link>
        </motion.div>
    )
}

export default ProductDisplay
