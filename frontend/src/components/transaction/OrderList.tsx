import { Box, Image, Text, Stack, Center } from "@chakra-ui/react"
import React, { FC } from "react"

const OrderList: FC<{
    imageUrl: string
    imageAlt: string
    product: string
    price: string
    quantity: number
}> = ({ imageUrl, imageAlt, product, price, quantity }) => {
    return (
        <div>
            <Center>
                <Stack w="93%" bg="orange.50" color={"black"} borderRadius="10px" direction="row" alignItems={"center"} gap="25%">
                    <Stack direction="row" alignItems={"center"}>
                        <Image boxSize="100px" src={imageUrl} alt={imageAlt} borderRadius="10px" m="10px" />
                        <Box>
                            <Text fontSize="xl" fontWeight={"bold"}>
                                Order Name:
                            </Text>
                            <Text fontSize="xl" fontWeight={"bold"}>
                                {product}
                            </Text>
                        </Box>
                    </Stack>
                    <Box>
                        <Text fontSize="xl" fontWeight={"bold"}>
                            Quantity:
                        </Text>
                        <Center>
                            <Text fontSize="xl" fontWeight={"bold"}>
                                {quantity}
                            </Text>
                        </Center>
                    </Box>
                    <Box>
                        <Text fontSize="xl" fontWeight={"bold"}>
                            Price:
                        </Text>
                        <Text fontSize="xl" fontWeight={"bold"}>
                            {price}
                        </Text>
                    </Box>
                </Stack>
            </Center>
        </div>
    )
}

export default OrderList
