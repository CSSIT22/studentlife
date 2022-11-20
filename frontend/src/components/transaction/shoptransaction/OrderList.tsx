import { Box, Image, Text, Stack, Center, useMediaQuery } from "@chakra-ui/react"
import React, { FC } from "react"

const OrderList: FC<{
    imageUrl: string
    imageAlt: string
    product: string
    price: string
    quantity: number
}> = ({ imageUrl, imageAlt, product, price, quantity }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    return (
        <div>
            <Box p={4} display={{ md: "flex" }} bg="#fff2e5" borderRadius="lg">
                <Center>
                    <Box flexShrink={0}>
                        <Image src={imageUrl} alt={imageAlt} borderRadius="lg" shadow={"lg"} boxSize="100px" />
                    </Box>
                </Center>
                <Stack
                    direction={isSmallerThan768 ? "column" : "row"}
                    align={isSmallerThan768 ? "flex-start" : "center"}
                    m="10px"
                    spacing="0"
                    gap={isSmallerThan768 ? "" : "100px"}
                >
                    <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                        Product: {product}
                    </Text>

                    <Box>
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                            Quantity: {quantity}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                            Price: {price}
                        </Text>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}

export default OrderList
