import { Shop_Product_Images } from "@apiType/shop"
import { Badge, Box, Center, Flex, Image, LinkBox, LinkOverlay, Spacer, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import convertCurrency, { setDataAPI } from "./functions/usefulFunctions"

const ProductDisplay: FC<{
    id: number
    name: string
    brandName: string
    price: number
    image?: string
}> = ({ id, name, brandName, price, image }) => {
    // Set Image to Placeholder
    let displayImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    if (image){displayImage = image}
    return (
        <motion.div initial={{scale: 0.1}} animate={{ scale: 1}} transition={{
            default: { ease: "backOut", duration: 0.5}
          }}>
        <LinkBox>
            <Link to={"/shop/product/" + id}>
                <Box mt="6" background="white" width="11rem" height="16rem" borderRadius="lg" overflow="hidden" shadow="xl" border="1px solid"
                    _hover={{ transform: "scale(1.1)" }} transitionDuration="300ms">
                    <Flex direction="column">
                        <Box mt="3" mx="3" mb="2" borderRadius="lg" overflow="hidden" shadow="md">
                            <Image width="11rem" height="9rem" src={displayImage} alt="Img" objectFit="cover" />
                        </Box>
                        <Box px="6">
                            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                                {name}
                            </Box>
                            <Box color="gray.600" fontSize="sm">
                                {brandName}
                            </Box>
                            <Box color="gray.600" fontSize="sm">
                                {convertCurrency(price)}
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Link>
        </LinkBox>
        </motion.div>
    )
}

export default ProductDisplay
