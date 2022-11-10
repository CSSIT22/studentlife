import { Badge, Box, Center, Flex, Image, LinkBox, LinkOverlay, Spacer, VStack } from "@chakra-ui/react"
import React, { FC } from "react"

const ProductDisplay: FC<{
    name: string
    image: string
    brandName: string
    price: string
    link: string
}> = ({ name, image, brandName, price, link }) => {
    return (
        <div>
            <Box pt-6 background="white" width="11rem" height="16rem" borderRadius="lg" overflow="hidden" shadow="md">
            <LinkBox>
                <Flex direction="column">
                    <LinkOverlay href={link}></LinkOverlay>
                    <Center>
                        <Image width="11rem" height="9rem" src={image} alt="Img" objectFit="cover" />
                    </Center>
                    <Box pt="2" px ="6">
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
                                {"฿" + price}
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
