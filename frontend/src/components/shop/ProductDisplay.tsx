import { Badge, Box, Center, Flex, Image, LinkBox, LinkOverlay, Spacer, VStack } from "@chakra-ui/react"
import React, { FC } from "react"
import convertCurrency from "./functions/usefulFunctions"

const ProductDisplay: FC<{
    name: string
    image: string
    brandName: string
    price: number
    link: string
}> = ({ name, image, brandName, price, link }) => {
    return (
        <div>
            <Box mt="6" background="white" width="11rem" height="16rem" borderRadius="lg" overflow="hidden" shadow="xl" border ="1px solid">
                <LinkBox>
                    <Flex direction="column">
                        <LinkOverlay href={link}></LinkOverlay>
                        <Box mt = "3" mx="3" mb="2" borderRadius="lg" overflow="hidden" shadow="md">
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
                </LinkBox>
            </Box>
        </div>
    )
}

export default ProductDisplay
