import { Box, Flex } from "@chakra-ui/react"
import React, { FC } from "react"

const SetDropBox: FC<{
    children: React.ReactNode
}> = (props) => {
    return (
        <Box rounded={"xl"} border={"1px"} py={10} px={[3, 6, 8]} borderColor={"gray.300"} gap={3} w={"full"}>
            {props.children}
        </Box>
    )
}

export default SetDropBox
