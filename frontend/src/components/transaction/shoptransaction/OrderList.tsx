import { Image, Text, Stack, Show, Hide } from "@chakra-ui/react"
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
            <Show above={"md"}>
                <Stack direction={"row"} bg={"#fff2e5"} borderRadius="lg" p={4} justifyContent="space-between" alignItems="center">
                    <Image src={imageUrl} alt={imageAlt} borderRadius="lg" shadow={"lg"} boxSize="100px" />

                    <Stack w={"100%"} direction={"row"} justifyContent="start">
                        <Stack w={"50%"}>
                            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                                Product: {product}
                            </Text>
                        </Stack>
                        <Stack w={"20%"}>
                            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                                Quantity: {quantity}
                            </Text>
                        </Stack>
                        <Stack w={"30%"}>
                            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                                Price: {price}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Show>
            <Hide above="md">
                <Stack direction={"row"} bg={"#fff2e5"} borderRadius="lg" p={4} justifyContent="space-between" alignItems="center">
                    <Image src={imageUrl} alt={imageAlt} borderRadius="lg" shadow={"lg"} boxSize="100px" />

                    <Stack w={"100%"} direction={"column"} justifyContent="start">
                        <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                            Product: {product}
                        </Text>

                        <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                            Quantity: {quantity}
                        </Text>

                        <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                            Price: {price}
                        </Text>
                    </Stack>
                </Stack>
            </Hide>
            {/* <Box p={4} display={{ md: "flex" }} bg="#fff2e5" borderRadius="lg">
                <Center>
                    <Box flexShrink={0}>
                        <Image src={imageUrl} alt={imageAlt} borderRadius="lg" shadow={"lg"} boxSize="100px" />
                    </Box>
                </Center>
                <Stack
                    direction={isSmallerThan768 ? "column" : "row"}
                    align={isSmallerThan768 ? "center" : "center"}
                    m="10px"
                    gap={isSmallerThan768 ? "" : "100px"}
                    flex="25%"
                    spacing="10%"
                >
                    <Box>
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                            Product: {product}
                        </Text>
                    </Box>



                    <Box>
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black" >
                            Quantity: {quantity}
                        </Text>
                    </Box>
                    <Box >
                        <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black" justifyContent="right">
                            Price: {price}
                        </Text>
                    </Box>


                </Stack>
            </Box> */}
        </div>
    )
}

export default OrderList
