import { Box, LinkBox } from "@chakra-ui/react"
import React, { FC } from "react"
import { Flex, Heading, Image } from "@chakra-ui/react"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import { Link } from "react-router-dom"

const OrderConfirmProduct: FC<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
}> = ({ id, name, price, quantity, image }) => {
    return (
        <LinkBox>
            <Link to={"/shop/product/" + id}>
                <Flex justify={"space-evenly"} direction={"row"} wrap={"wrap"}>
                    <Image
                        width={{ base: 100, xl: 135 }}
                        height={{ base: 100, xl: 118 }}
                        my="3"
                        src={image}
                        alt="product picture"
                        placeholder="blur"
                        borderRadius="5%"
                        objectFit="cover"
                        border='3px solid black'
                    />
                    <Flex wrap="wrap" align="center" justify="space-around" my="5" >
                        <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                            {name}
                        </Box>
                        <Flex wrap="wrap" align="center" justify="center">
                            <Box>
                                <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                                    Price: {convertCurrency(price)}
                                </Box>
                            </Box>
                            <Box>
                                <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                                    Qt: {quantity}
                                </Box>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </LinkBox>
    )
}

export default OrderConfirmProduct
