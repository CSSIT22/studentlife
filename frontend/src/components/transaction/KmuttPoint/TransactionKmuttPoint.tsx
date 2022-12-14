import { Box, Center, Flex, Input, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TransactionKmuttPoint = () => {
    const point = 50
    return (
        <Box borderRadius={"md"} bg={"white"} display="flex" shadow={"lg"} padding={3}>
            <Center>
                <Text fontSize="3xl">{point}</Text>
                <Text fontSize="2xl" as={"b"} paddingLeft={3}>
                    Point Available
                </Text>
            </Center>
        </Box>
    )
}

export default TransactionKmuttPoint
