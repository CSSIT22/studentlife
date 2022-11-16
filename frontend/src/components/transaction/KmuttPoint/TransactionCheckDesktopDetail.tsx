import { Box, Flex, Spacer, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TransactionCheckDesktopDetail: FC<{ orderId: string; point_Used: number }> = ({ orderId, point_Used }) => {
    return (
        <Box display={{ md: "block" }}>
            <Box >
                <Flex>
                    <Text color="black"  fontWeight="700" fontSize="30px" lineHeight="133%">
                        Order Id : {orderId}
                    </Text>
                    
                    <Text color="black"  fontWeight="700" fontSize="30px" lineHeight="133%">
                        {point_Used}
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}

export default TransactionCheckDesktopDetail
