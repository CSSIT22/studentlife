import { Box, Flex, Spacer, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TransactionCheckDesktopDetail: FC<{ orderId: string; point_Used: number }> = ({ orderId, point_Used }) => {
    return (
        <Box display={{ md: "block" }}>
            <Box display={"flex"}>
                <Flex>
                    <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                        Order Id : {orderId}
                    </Text>
                    <Spacer />
                    <Text color="black" mt="46px" fontWeight="700" fontSize="30px" lineHeight="133%">
                        {point_Used}
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}

export default TransactionCheckDesktopDetail
