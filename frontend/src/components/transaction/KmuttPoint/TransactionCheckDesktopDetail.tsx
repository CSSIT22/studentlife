import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TransactionCheckDesktopDetail: FC<{ orderId: string; point_Used: number }> = ({ orderId, point_Used }) => {
    return (
        <Box h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
            <Heading size="xs" textTransform="uppercase">
                Transaction ID: {orderId}
            </Heading>
            <Text pt="2" fontSize="sm">
                Point Used: {point_Used}
            </Text>
        </Box>
    )
}

export default TransactionCheckDesktopDetail
