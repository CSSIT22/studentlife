import { Shop_Product_Images } from "@apiType/shop"
import { Badge, Box, Center, Flex, Image, LinkBox, LinkOverlay, Spacer, VStack } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import convertCurrency, { setDataAPI } from "./functions/usefulFunctions"

const ProductDisplay: FC<{
    id: number
    name: string
    brandName: string
    price: number
}> = ({ id, name, brandName, price }) => {
    const [productImages, setProductImages] = useState<Shop_Product_Images[] | null>(null)
    let displayImage: string
    let completed = setDataAPI("shop/getProductImages/" + id, setProductImages)
    // Set Image to Placeholder
    displayImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    if (productImages != null){displayImage = productImages[0].image}

    return (
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
    )
}

export default ProductDisplay
