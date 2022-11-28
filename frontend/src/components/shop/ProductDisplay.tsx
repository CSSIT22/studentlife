import { Badge, Box, Center, Flex, Image, LinkBox, LinkOverlay, Spacer, VStack } from "@chakra-ui/react"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import convertCurrency from "./functions/usefulFunctions"

const ProductDisplay: FC<{
    id: number
    name: string
    image: string
    brandName: string
    price: number
    link?: string
}> = ({ id, name, image, brandName, price, link }) => {
    return (
        <LinkBox>
            <Link to={link ? link : "/shop/product/" + id} state={{ p_id: id }}>
                <Box mt="6" background="white" width="11rem" height="16rem" borderRadius="lg" overflow="hidden" shadow="xl" border="1px solid">
                    <Flex direction="column">
                        <Box mt="3" mx="3" mb="2" borderRadius="lg" overflow="hidden" shadow="md">
                            <Image width="11rem" height="9rem" src={image} alt="Img" objectFit="cover" />
                        </Box>
                        <Box px="6">
                            {/* // Uncomment to add Badge
                        <Box display="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                            </Badge>
                        </Box> */}
                            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                                {name}
                            </Box>

                            <Box>
                                <Box as="span" color="gray.600" fontSize="sm">
                                    {brandName}
                                </Box>
                            </Box>

                            <Box>
                                <Box as="span" color="gray.600" fontSize="sm">
                                    {convertCurrency(price)}
                                </Box>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Link>
        </LinkBox>
    )
}

export default ProductDisplay
