import { Box, Center, HStack, SimpleGrid, Stack, Text, useMediaQuery, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { P_history } from "../shared/PointHistory"
import TransactionCheckDesktopDetail from "./TransactionCheckDesktopDetail"

interface state {
    point_history: {
        orderId: string
        point_Used: number
        date: Date
        time: TimeRanges
    }[]
}

const TransactionPointHistory = () => {
    const [desktopthan1280] = useMediaQuery("(min-width: 800px)")
    let PState = { point_history: P_history }
    return (
        <Box borderRadius={"md"} bg={"orange"} display="flex" padding={3}>
            <Text color={"white"} as="b" fontSize={"xl"}>
                History
            </Text>
            <Box w={{ base: "159px", md: "100%" }} ml="10px" mr="10px">
                {PState.point_history.map(({ orderId, point_Used }) => (
                    <Box gap={5}>
                        <TransactionCheckDesktopDetail orderId={orderId} point_Used={point_Used} />
                    </Box>
                ))}
            </Box>
        </Box >
    )
}

export default TransactionPointHistory
