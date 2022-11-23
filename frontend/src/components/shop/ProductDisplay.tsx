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
            <Box pt-6 background="white" width="223px" height="261px" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <LinkBox>
                <Flex direction="column">
                    <Spacer />
                    <LinkOverlay href={link}></LinkOverlay>
                    <Center pt="2">
                        <Image width="188px" height="141px" src={image} alt="Img" />
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
